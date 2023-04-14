import Comments from './Comments';
import PostContent from './PostContent';
import PostHeader from './PostHeader';
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
      <PostHeader postMetaData={{ ...frontMatter }} />
      <PostContent content={post.content} />
      <Comments />
    </>
  );
};

export default Post;
