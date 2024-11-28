import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import DashboardReviewMain from '../components/dashboard/review'

const DashboardReview = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Dashboard Review  ORWA'} />
         <DashboardReviewMain />
      </Wrapper>
   );
};

export default DashboardReview;