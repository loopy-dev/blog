import projects from '../../../data/projects';
import ArticleLayout from '../../layouts/ArticleLayout';
import ContentTemplate from '../ContentTemplate';

const Projects = () => {
  return (
    <ArticleLayout title="Projects">
      {projects.map((project) => (
        <ContentTemplate key={project.title} sticky content={project} />
      ))}
    </ArticleLayout>
  );
};

export default Projects;
