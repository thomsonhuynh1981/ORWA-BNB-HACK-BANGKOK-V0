import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import ServiceTwoMain from '../components/inner-pages/services/service-two';

const ServiceTwo = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Service Two ORWA'} />
         <ServiceTwoMain />
      </Wrapper>
   );
};

export default ServiceTwo;