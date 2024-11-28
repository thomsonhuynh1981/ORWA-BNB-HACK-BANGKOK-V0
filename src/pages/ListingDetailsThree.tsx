import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import ListingDetailsThreeMain from '../components/ListingDetails/listing-details-3';

const ListingDetailsThree = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Listing Details Three ORWA'} />
         <ListingDetailsThreeMain />
      </Wrapper>
   );
};

export default ListingDetailsThree;