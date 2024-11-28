import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import BlogThreeMain from '../components/blogs/blog-three'

const BlogThree = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Blog Three ORWA'} />
         <BlogThreeMain />
      </Wrapper>
   );
};

export default BlogThree;