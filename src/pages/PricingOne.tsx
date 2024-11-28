import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import PricingOneMain from '../components/inner-pages/pricing/pricing-one';

const PricingOne = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Pricing One ORWA'} />
         <PricingOneMain />
      </Wrapper>
   );
};

export default PricingOne;