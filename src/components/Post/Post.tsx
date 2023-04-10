import Comments from './Comments';
import Content from './PostContent';
import ContentTitle from './PostTitle';
import type { FrontMatter, Post as PostModel } from '~/models/Post';

interface Props {
  post: PostModel;
}

const Post = ({ post }: Props) => {
  const frontMatter: FrontMatter = {
    title: post.title,
    url: post.url,
    tags: post.tags,
    description: post.description,
    createdTime: post.createdTime,
  };
  return (
    <>
      <ContentTitle postMetaData={{ ...frontMatter }} />
      <Content content={post.content} />
      <Comments />
    </>
  );
};

export default Post;
