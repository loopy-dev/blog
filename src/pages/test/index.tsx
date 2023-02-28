import ContentLayout from '~/components/layouts/ContentLayout';
import ItemSkeleton from '~/components/Post/ItemSkeleton';
import PostListItem from '~/components/Post/ListItem';

const Page = () => {
  return (
    <ContentLayout>
      <PostListItem />
      <ItemSkeleton />
    </ContentLayout>
  );
};

export default Page;
