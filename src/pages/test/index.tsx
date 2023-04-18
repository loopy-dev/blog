import PostSkeleton from '~components/Post/PostSkeleton';
import PostLayout from '~components/layouts/PostLayout';

const Page = () => {
  return (
    <PostLayout aside={<div>Hello, World!</div>} content={<PostSkeleton />} />
  );
};

export default Page;
