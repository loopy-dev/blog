import PostListBuilder from '~/posts/PostListBuilder';
import postService from '~lib/post';

const Page = async () => {
  const posts = await postService.getPostListMetaData();

  return <PostListBuilder posts={posts} />;
};

export default Page;
