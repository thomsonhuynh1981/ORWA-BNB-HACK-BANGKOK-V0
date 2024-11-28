import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import DashboardMembershipMain from '../components/dashboard/membership'

const DashboardMembership = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Dashboard Membership  ORWA'} />
         <DashboardMembershipMain />
      </Wrapper>
   );
};

export default DashboardMembership;