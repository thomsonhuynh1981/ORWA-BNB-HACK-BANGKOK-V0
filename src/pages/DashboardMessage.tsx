import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import DashboardMessageMain from '../components/dashboard/message'

const DashboardMessage = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Dashboard Message  ORWA'} />
         <DashboardMessageMain />
      </Wrapper>
   );
};

export default DashboardMessage;