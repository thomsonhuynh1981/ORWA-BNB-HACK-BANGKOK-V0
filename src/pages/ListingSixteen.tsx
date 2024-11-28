import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import ListingSixteenMain from '../components/inner-listing/listing-16';

const ListingSixteen = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Listing Sixteen ORWA'} />
         <ListingSixteenMain />
      </Wrapper>
   );
};

export default ListingSixteen;