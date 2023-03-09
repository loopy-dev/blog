import ArticleLayout from '~/components/layouts/ArticleLayout';
import { educations } from '../../../data/educations';
import ContentTemplate from '../ContentTemplate';

const Educations = () => {
  return (
    <ArticleLayout title="Educations">
      {educations.map((education) => (
        <ContentTemplate key={education.title} content={education} />
      ))}
    </ArticleLayout>
  );
};

export default Educations;
