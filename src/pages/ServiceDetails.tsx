import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import ServiceDetailsMain from '../components/inner-pages/services/service-details';

const ServiceDetails = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Service Details ORWA'} />
         <ServiceDetailsMain />
      </Wrapper>
   );
};

export default ServiceDetails;