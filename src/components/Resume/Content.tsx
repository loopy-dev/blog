import ArticleLayout from '~/components/layouts/ArticleLayout';
import ContentTemplate from './ContentTemplate';
import type { Resume } from '~/models/Resume';

interface Props {
  title: string;
  contents: Resume[];
  sticky?: boolean;
}

const Activities = ({ title, contents, sticky }: Props) => {
  return (
    <ArticleLayout title={title}>
      {contents.map((content) => (
        <ContentTemplate
          key={content.title}
          content={content}
          sticky={sticky}
        />
      ))}
    </ArticleLayout>
  );
};

export default Activities;
