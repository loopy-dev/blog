import ContentSkeleton from '~/components/Post/ContentSkeleton';
import ContentLayout from '~/components/layouts/ContentLayout';

const Page = () => {
  return (
    <ContentLayout>
      <ContentSkeleton />
    </ContentLayout>
  );
};

export default Page;
