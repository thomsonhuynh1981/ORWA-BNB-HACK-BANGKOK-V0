import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import ListingThreeMain from '../components/inner-listing/listing-03';

const ListingThree = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Listing Three ORWA'} />
         <ListingThreeMain />
      </Wrapper>
   );
};

export default ListingThree;