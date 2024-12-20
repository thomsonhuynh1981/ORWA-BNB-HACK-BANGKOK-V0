import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import BlogDetailsMain from '../components/blogs/blog-details'

const BlogDetails = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Blog Details ORWA'} />
         <BlogDetailsMain />
      </Wrapper>
   );
};

export default BlogDetails;