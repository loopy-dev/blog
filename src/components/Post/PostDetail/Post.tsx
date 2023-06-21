import dynamic from 'next/dynamic';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import PostSeries from './PostSeries';
import PostTemplate from './PostTemplate';
import PostThumnail from './Thumnail';
import type {
  FrontMatter,
  Post as PostModel,
  Series as SeriesType,
} from '~/models/Post';

interface Props {
  post: PostModel;
  recommendedPosts: FrontMatter[];
  series: SeriesType | null;
  category?: string;
}

const PostAside = dynamic(() => import('./PostAside'), { ssr: false });

const Post = ({
  post,
  recommendedPosts,
  series,
  category = 'posts',
}: Props) => {
  const frontMatter: FrontMatter = {
    title: post.title,
    url: post.url,
    tags: post.tags,
    description: post.description,
    createdTime: post.createdTime,
    coverImage: post.coverImage,
  };

  return (
    <PostTemplate
      aside={<PostAside />}
      content={
        <>
          <PostHeader postMetaData={{ ...frontMatter }} />
          {post.coverImage && (
            <PostThumnail maxHeight="1024px" src={post.coverImage} />
          )}
          {series && <PostSeries series={series} />}
          <PostContent content={post.content} />
          <PostFooter
            category={category}
            recommendedPosts={recommendedPosts}
            url={frontMatter.url}
          />
        </>
      }
    />
  );
};

export default Post;
