import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import ListingTenMain from '../components/inner-listing/listing-10';

const ListingTen = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Listing Ten ORWA'} />
         <ListingTenMain />
      </Wrapper>
   );
};

export default ListingTen;