import { prize } from '~/data/prize';
import ArticleLayout from '~components/layouts/ArticleLayout';
import ContentTemplate from '../ContentTemplate';

const Prize = () => {
  return (
    <ArticleLayout title="Prize">
      {prize.map((content) => (
        <ContentTemplate key={content.title} content={content} />
      ))}
    </ArticleLayout>
  );
};

export default Prize;
