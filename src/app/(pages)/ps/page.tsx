import { psService } from '~lib/post';
import PSListBuilder from '~/posts/PSListBuilder';

const Page = async () => {
  const posts = await psService.getPostListMetaData();

  return <PSListBuilder posts={posts} />;
};

export default Page;
