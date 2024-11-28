'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  bsc,
  bscGreenfield,
  opBNB,
  opBNBTestnet,
  bscTestnet,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: 'Olym3 - Real-World Assets',
  projectId: "b735f0d8b8e242fb3e26f7c8dd1062b1",
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [trustWallet, ledgerWallet],
    },
  ],
  chains: [
    bscGreenfield,
    opBNB,
    opBNBTestnet,
    bsc,
    bscTestnet,
  ],
  transports: {
    [bscGreenfield.id]: http('https://greenfield-chain.bnbchain.org'),
    [opBNB.id]: http('https://opbnb-rpc.publicnode.com'),
    [opBNBTestnet.id]: http('https://opbnb-testnet-rpc.publicnode.com'),
    [bsc.id]: http('https://bsc-rpc.publicnode.com'),
    [bscTestnet.id]: http('https://bsc-testnet-rpc.publicnode.com'),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}