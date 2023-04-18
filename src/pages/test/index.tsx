import PostSkeleton from '~components/Post/PostSkeleton';
import PostTemplate from '~components/Post/PostTemplate';

const Page = () => {
  return (
    <PostTemplate aside={<div>Hello, World!</div>} content={<PostSkeleton />} />
  );
};

export default Page;
