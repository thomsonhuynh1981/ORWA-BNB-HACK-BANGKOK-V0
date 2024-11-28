import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import AboutUsTwoMain from '../components/inner-pages/about-us/about-us-two';

const AboutUsTwo = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'About Us Two ORWA'} />
         <AboutUsTwoMain />
      </Wrapper>
   );
};

export default AboutUsTwo;