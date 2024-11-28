import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import ListingDetailsSixMain from '../components/ListingDetails/listing-details-6';

const ListingDetailsSix = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Listing Details Six ORWA'} />
         <ListingDetailsSixMain />
      </Wrapper>
   );
};

export default ListingDetailsSix;