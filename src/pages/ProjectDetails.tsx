import Wrapper from '../layouts/Wrapper';
import SEO from '../components/SEO';
import ProjectDetailsMain from '../components/inner-pages/projects/project-details';

const ProjectDetails = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Project Details ORWA'} />
         <ProjectDetailsMain />
      </Wrapper>
   );
};

export default ProjectDetails;