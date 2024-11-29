// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import { AccessControlUpgradeable } from "./AccessControlUpgradeable.sol";
import { IERC20Upgradeable } from "./IERC20Upgradeable.sol";
import { SafeERC20Upgradeable } from "./SafeERC20Upgradeable.sol";
import { PausableUpgradeable } from "./PausableUpgradeable.sol";
import { ECDSA } from "./ECDSA.sol";
import { IDecubateMasterChef } from "./IDecubateMasterChef.sol";

/**
 * @title DCBVault
 * @dev Vault contract for managing user deposits, staking, and rewards distribution
 */
contract DCBVault is AccessControlUpgradeable, PausableUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    struct UserInfo {
        uint256 shares; // number of shares for a user
        uint256 lastDepositedTime; // keeps track of deposited time for potential penalty
        uint256 totalInvested; // Total amount of token invested
        uint256 totalClaimed; // Total amount of token claimed
    }

    struct PoolInfo {
        uint256 totalShares; // Total shares in the pool
        uint256 pendingClaim; // Claim stored when pool is full
        uint256 lastHarvestedTime; // keeps track of the last pool update
    }

    struct Rebate {
        bool isEarlyWithdrawActive; // If early withdraw is active
        uint256 rebatePercent; // Rebate percent
        uint256 earlyWithdrawPenalty; // Penalty for early withdraw
    }

    struct Fee {
        uint256 depositFee;
        address feeReceiver;
    }

    IDecubateMasterChef public masterchef; // MasterChef contract

    uint256 public callFee; // Fee to call harvestAll function
    uint256 internal constant DIVISOR = 10_000;

    // User staking info
    mapping(uint256 => mapping(address => UserInfo)) public users;
    // Pool info
    mapping(uint256 => PoolInfo) public pools;
    // Pool rebate info
    mapping(uint256 => Rebate) public rebates;
    // Deposit fee info
    Fee public fee;
    // EIP712 domainSeparator
    bytes32 internal domainSeparator;
    // EIP712 domain separator version
    string public constant ERC712_VERSION = "1";
    // EIP712 domain typehash
    bytes32 internal constant EIP712_DOMAIN_TYPEHASH =
        keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");

    bytes32 internal constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bytes32 internal constant TRANSFER_USER_INFO_TYPEHASH = keccak256(
        "TransferUserInfo(uint256 pid,address to,uint256 shares,uint256 lastDepositedTime,uint256 totalInvested,uint256 totalClaimed)"
    );

    event Deposit(address indexed sender, uint256 indexed poolId, uint256 amount, uint256 lastDepositedTime);
    event Withdraw(address indexed sender, uint256 indexed poolId, uint256 amount, uint256 time);
    event Harvest(address indexed sender, uint256 indexed poolId, uint256 time);
    event WithdrawPenalty(address indexed sender, uint256 indexed poolId, uint256 amount);
    event RebateSent(address indexed sender, uint256 indexed poolId, uint256 amount);
    event CallFeeSet(uint256 callFee);
    event RebateInfoSet(uint256 pid, Rebate rebate);
    event DepositFee(address feeReceiver, uint256 depositFee);
    event ManagerRoleSet(address _user, bool _status);
    event TransferUserInfo(address indexed from, address to, uint256 pid);

    error InvalidTransferUserInfoSignature(bytes signature);
    error UserAlreadyHasShares(address to, uint256 pid);

    modifier onlyManager() {
        require(hasRole(MANAGER_ROLE, msg.sender), "Only manager");
        _;
    }

    /**
     * @notice Modifier to prevent contract interactions
     */
    modifier notContract() {
        // solhint-disable-next-line avoid-tx-origin
        require(msg.sender == tx.origin && msg.sender.code.length == 0, "contract not allowed");
        _;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @notice Initializes the contract with the MasterChef contract address
     * @param _masterchef Address of the MasterChef contract
     */
    function initialize(IDecubateMasterChef _masterchef, address _admin) external initializer {
        require(address(_masterchef) != address(0), "Zero address");
        __AccessControl_init();
        _setupRole(DEFAULT_ADMIN_ROLE, _admin);
        _setupRole(MANAGER_ROLE, _admin);
        _setDomainSeparator("DCBVault");

        masterchef = IDecubateMasterChef(_masterchef);
        callFee = 25;

        // Set default deposit fee
        fee.depositFee = 0;
        fee.feeReceiver = msg.sender;
    }

    function getDomainSeparator() public view returns (bytes32) {
        return domainSeparator;
    }

    /**
     * @notice Sets the domain separator
     * @param name Name of the domain
     */
    function setDomainSeparator(string memory name) external onlyManager {
        _setDomainSeparator(name);
    }

    function setManagerRole(address _user, bool _status) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (_status) grantRole(MANAGER_ROLE, _user);
        else revokeRole(MANAGER_ROLE, _user);

        emit ManagerRoleSet(_user, _status);
    }

    /**
     * @notice Deposits tokens into the DCB Vault
     * @param _pid Pool id
     * @param _amount Amount of tokens to deposit
     */
    function deposit(uint256 _pid, uint256 _amount) external whenNotPaused notContract {
        require(_amount > 0, "Nothing to deposit");

        PoolInfo storage pool = pools[_pid];
        IERC20Upgradeable token;
        {
            (, uint256 lockPeriodInDays, uint256 totalDeposit,, uint256 endDate, uint256 hardCap, address tokenOfPool) =
                masterchef.poolInfo(_pid);

            require(totalDeposit + _amount <= hardCap, "Pool full");
            uint256 stopDepo = endDate - (lockPeriodInDays * 1 days);
            require(block.timestamp <= stopDepo, "Staking disabled for this pool");

            token = IERC20Upgradeable(tokenOfPool);
        }

        uint256 poolBal = balanceOf(_pid);
        poolBal += masterchef.payout(_pid, address(this));
        token.safeTransferFrom(msg.sender, address(this), _amount);

        if (fee.depositFee > 0) {
            uint256 feeAmount = (_amount * fee.depositFee) / DIVISOR;
            token.safeTransfer(fee.feeReceiver, feeAmount);
            emit DepositFee(fee.feeReceiver, feeAmount);
        }

        uint256 currentShares = 0;

        if (pool.totalShares != 0) {
            currentShares = (_amount * pool.totalShares) / poolBal;
        } else {
            token.approve(address(masterchef), type(uint256).max);
            currentShares = _amount;
        }

        UserInfo storage user = users[_pid][msg.sender];

        user.shares += currentShares;
        user.lastDepositedTime = block.timestamp;
        user.totalInvested += _amount;

        pool.totalShares += currentShares;
        pool.pendingClaim += _amount;

        _earn(_pid);

        uint256 rebateAmount = (_amount * rebates[_pid].rebatePercent) / DIVISOR;
        if (rebateAmount > 0) {
            uint256 total = balanceOf(_pid);
            uint256 balance = token.balanceOf(address(masterchef));
            require(balance - total >= rebateAmount, "Not enough rebate balance");
            token.safeTransferFrom(address(masterchef), msg.sender, rebateAmount);

            emit RebateSent(msg.sender, _pid, rebateAmount);
        }

        emit Deposit(msg.sender, _pid, _amount, block.timestamp);
    }

    /**
     * @notice Withdraws all funds from the DCB Vault of a user
     * @param _pid Pool id
     */
    function withdrawAll(uint256 _pid) external notContract {
        withdraw(_pid, users[_pid][msg.sender].shares);
    }

    /**
     * @notice Harvests all pools
     * @dev Only possible when contract not paused.
     */
    function harvestAll() external notContract whenNotPaused {
        uint256 poolLen = masterchef.poolLength();

        for (uint256 pid = 0; pid < poolLen; pid++) {
            harvest(pid);
        }
    }

    /**
     * @notice Sets the call fee
     * @param _callFee New call fee
     */
    function setCallFee(uint256 _callFee) external onlyManager {
        require(_callFee < DIVISOR / 2, "Invalid");
        callFee = _callFee;

        emit CallFeeSet(_callFee);
    }

    /**
     * @notice Sets the deposit fee
     * @param _feeReceiver Address of the fee receiver
     * @param _depositFee New deposit fee
     */
    function setDepositFee(address _feeReceiver, uint256 _depositFee) external {
        require(msg.sender == fee.feeReceiver, "Not allowed");
        require(_depositFee < DIVISOR / 2, "Invalid");
        fee.depositFee = _depositFee;
        fee.feeReceiver = _feeReceiver;
    }

    /**
     * @notice Sets rebate info
     * @param _pid Pool id
     * @param _rebate New rebate info
     */
    function setRebateInfo(uint256 _pid, Rebate memory _rebate) external onlyManager {
        require(_rebate.rebatePercent <= DIVISOR && _rebate.earlyWithdrawPenalty <= DIVISOR, "Invalid rebate percent");
        rebates[_pid] = _rebate;

        emit RebateInfoSet(_pid, _rebate);
    }

    /**
     * @notice Triggers stopped state
     * @dev Only possible when contract not paused.
     */
    function pause() external onlyManager whenNotPaused {
        _pause();
    }

    /**
     * @notice Returns to normal state
     * @dev Only possible when contract is paused.
     */
    function unpause() external onlyManager whenPaused {
        _unpause();
    }

    /**
     * @notice Calculates the total pending reward of a pool
     * @param _pid Pool id
     * @return amount Total pending reward
     */
    function calculateTotalPendingRewards(uint256 _pid) external view returns (uint256 amount) {
        amount = masterchef.payout(_pid, address(this));
        amount += pools[_pid].pendingClaim;

        return amount;
    }

    /**
     * @notice Calculate the reward user receives on harvest
     * @param _pid Pool id
     * @return currentCallFee Reward amount
     */
    function calculateHarvestDcbRewards(uint256 _pid) external view returns (uint256 currentCallFee) {
        uint256 amount = masterchef.payout(_pid, address(this));
        amount += pools[_pid].pendingClaim;
        currentCallFee = (amount * callFee) / DIVISOR;

        return currentCallFee;
    }

    /**
     * @notice Calculate the reward user receives on withdraw
     * @param _user User address
     * @param _pid Pool id
     * @return reward Reward amount
     */
    function getRewardOfUser(address _user, uint256 _pid) external view returns (uint256 reward) {
        UserInfo storage user = users[_pid][_user];
        uint256 pricePerFullShare = getPricePerFullShare(_pid);
        uint256 userTotal = (user.shares * pricePerFullShare) / 1e18;

        reward = userTotal >= user.totalInvested ? userTotal - user.totalInvested : 0;
    }

    /**
     * @notice Withdraws funds from the DCB Vault
     * @param _pid Pool id
     * @param _shares Number of shares to withdraw
     */
    function withdraw(uint256 _pid, uint256 _shares) public notContract {
        harvest(_pid);

        PoolInfo storage pool = pools[_pid];
        UserInfo storage user = users[_pid][msg.sender];

        require(_shares > 0, "Nothing to withdraw");
        require(_shares <= user.shares, "Withdraw exceeds balance");
        require(canUnstake(msg.sender, _pid), "Stake still locked");

        uint256 currentAmount = (balanceOf(_pid) * _shares) / pool.totalShares;
        uint256 totalReward = currentAmount - (user.totalInvested * _shares) / user.shares;
        uint256 multipliedAmount = masterchef.handleNFTMultiplier(_pid, msg.sender, totalReward);

        user.totalInvested -= (user.totalInvested * _shares) / user.shares;
        user.shares -= _shares;
        pool.totalShares -= _shares;
        user.totalClaimed += totalReward + multipliedAmount; //With NFT Boost

        IERC20Upgradeable token = getTokenOfPool(_pid);
        masterchef.unStake(_pid, currentAmount);

        (, uint256 lockPeriod,,,,,) = masterchef.poolInfo(_pid);
        if (block.timestamp < user.lastDepositedTime + (lockPeriod * 1 days)) {
            uint256 penalty = (currentAmount * rebates[_pid].earlyWithdrawPenalty) / DIVISOR;
            token.safeTransfer(address(masterchef), penalty);
            currentAmount -= penalty;
            emit WithdrawPenalty(msg.sender, _pid, penalty);
        }

        token.safeTransfer(msg.sender, currentAmount);

        emit Withdraw(msg.sender, _pid, currentAmount, block.timestamp);
    }

    /**
     * @notice Harvests the pool rewards
     * @param _pid Pool id
     */
    function harvest(uint256 _pid) public notContract whenNotPaused {
        PoolInfo storage pool = pools[_pid];
        IERC20Upgradeable token = getTokenOfPool(_pid);

        uint256 prevBal = token.balanceOf(address(this));
        masterchef.claim(_pid);
        uint256 claimed = token.balanceOf(address(this)) - prevBal;

        uint256 currentCallFee = (claimed * callFee) / DIVISOR;
        claimed -= currentCallFee;
        pool.lastHarvestedTime = block.timestamp;
        pool.pendingClaim += claimed;
        if (currentCallFee > 0) token.safeTransfer(msg.sender, currentCallFee);

        _earn(_pid);

        emit Harvest(msg.sender, _pid, block.timestamp);
    }

    /**
     * @notice Returns the price per full share
     * @param _pid Pool id
     * @return Price per full share
     */
    function getPricePerFullShare(uint256 _pid) public view returns (uint256) {
        PoolInfo memory pool = pools[_pid];

        return pool.totalShares == 0 ? 1e18 : (balanceOf(_pid) * 1e18) / pool.totalShares;
    }

    /**
     * @notice Checks if the user can unstake
     * @param _user User address
     * @param _pid Pool id
     * @return Whether unstaking is allowed
     */
    function canUnstake(address _user, uint256 _pid) public view returns (bool) {
        UserInfo storage user = users[_pid][_user];
        (, uint256 lockPeriod,,,,,) = masterchef.poolInfo(_pid);

        return
            (block.timestamp >= user.lastDepositedTime + (lockPeriod * 1 days) || rebates[_pid].isEarlyWithdrawActive);
    }

    /**
     * @notice Returns the balance staked on the pool
     * @param _pid Pool id
     * @return Balance staked
     */
    function balanceOf(uint256 _pid) public view returns (uint256) {
        (uint256 amount,,,,) = masterchef.users(_pid, address(this));

        return pools[_pid].pendingClaim + amount;
    }

    /*
        * @notice Transfers user stake info to another address
        * @param from Address to transfer from
        * @param to Address to transfer to
        * @param pid Pool id
        * @param signature Signature of the user
        */
    function transferUserStakeInfo(
        address from,
        address to,
        uint256 pid,
        bytes calldata signature
    )
        public
        onlyManager
    {
        //check if to address has shares
        if (users[pid][to].shares > 0) {
            revert UserAlreadyHasShares(to, pid);
        }
        _verifyTransferUserInfoSignature(from, to, pid, signature);
        users[pid][to] = users[pid][from];
        delete users[pid][from];
        emit TransferUserInfo(from, to, pid);
    }

    /**
     * @notice Stake token to the pool
     * @param _pid Pool id
     */
    function _earn(uint256 _pid) internal {
        uint256 bal = pools[_pid].pendingClaim;
        if (bal > 0) {
            masterchef.stake(_pid, bal);
            pools[_pid].pendingClaim = 0;
        }
    }

    /**
     * @notice Returns the token of the pool
     * @param _pid Pool id
     * @return Token of the pool
     */
    function getTokenOfPool(uint256 _pid) internal view returns (IERC20Upgradeable) {
        (,,,,,, address token) = masterchef.poolInfo(_pid);
        return IERC20Upgradeable(token);
    }

    function _verifyTransferUserInfoSignature(
        address from,
        address to,
        uint256 pid,
        bytes calldata signature
    )
        private
        view
    {
        UserInfo memory userInfo = users[pid][from];
        bytes32 userInfoHash = _hashUserInfo(userInfo, to, pid);
        address signer = ECDSA.recover(toTypedMessageHash(userInfoHash), signature);
        if (signer != from) {
            revert InvalidTransferUserInfoSignature(signature);
        }
    }

    /**
     * @notice Hashes the user info
     * @param userInfo UserInfo struct
     * @param to Address to transfer
     * @param pid Pool id
     * @return Hash of the user info
     */
    function _hashUserInfo(UserInfo memory userInfo, address to, uint256 pid) private pure returns (bytes32) {
        return keccak256(
            abi.encode(
                TRANSFER_USER_INFO_TYPEHASH,
                pid,
                to,
                userInfo.shares,
                userInfo.lastDepositedTime,
                userInfo.totalInvested,
                userInfo.totalClaimed
            )
        );
    }

    function _setDomainSeparator(string memory name) internal {
        domainSeparator = keccak256(
            abi.encode(
                EIP712_DOMAIN_TYPEHASH,
                keccak256(bytes(name)),
                keccak256(bytes(ERC712_VERSION)),
                block.chainid,
                address(this)
            )
        );
    }

    /**
     * Accept message hash and returns hash message in EIP712 compatible form
     * So that it can be used to recover signer from signature signed using EIP712 formatted data
     * https://eips.ethereum.org/EIPS/eip-712
     * "\\x19" makes the encoding deterministic
     * "\\x01" is the version byte to make it compatible to EIP-191
     */
    function toTypedMessageHash(bytes32 messageHash) internal view returns (bytes32) {
        return keccak256(abi.encodePacked("\x19\x01", getDomainSeparator(), messageHash));
    }
}
