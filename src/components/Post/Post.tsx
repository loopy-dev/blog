import dynamic from 'next/dynamic';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import PostTemplate from './PostTemplate';
import type { FrontMatter, Post as PostModel } from '~/models/Post';

interface Props {
  post: PostModel;
  recommendedPosts: FrontMatter[];
}

const PostAside = dynamic(() => import('./PostAside'), { ssr: false });

const Post = ({ post, recommendedPosts }: Props) => {
  const frontMatter: FrontMatter = {
    title: post.title,
    url: post.url,
    tags: post.tags,
    description: post.description,
    createdTime: post.createdTime,
  };

  return (
    <PostTemplate
      aside={<PostAside />}
      content={
        <>
          <PostHeader postMetaData={{ ...frontMatter }} />
          <PostContent content={post.content} />
          <PostFooter
            recommendedPosts={recommendedPosts}
            url={frontMatter.url}
          />
        </>
      }
    />
  );
};

export default Post;
