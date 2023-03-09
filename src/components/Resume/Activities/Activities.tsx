import ArticleLayout from '~/components/layouts/ArticleLayout';
import { activities } from '../../../data/activities';
import ContentTemplate from '../ContentTemplate';

const Activities = () => {
  return (
    <ArticleLayout title="Activities">
      {activities.map((activity) => (
        <ContentTemplate key={activity.title} content={activity} />
      ))}
    </ArticleLayout>
  );
};

export default Activities;
