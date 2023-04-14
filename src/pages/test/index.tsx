import ItemSkeleton from '~components/Post/ItemSkeleton';
import ContentLayout from '~components/layouts/ContentLayout';

const Page = () => {
  return (
    <ContentLayout>
      <div style={{ marginTop: '5rem' }}>
        <ItemSkeleton />
      </div>
    </ContentLayout>
  );
};

export default Page;
