import dynamic from 'next/dynamic';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import PostTemplate from './PostTemplate';
import Series from './Series';
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
  };

  return (
    <PostTemplate
      aside={<PostAside />}
      content={
        <>
          <PostHeader postMetaData={{ ...frontMatter }} />
          {/** here goes series if exist */}
          {series && <Series series={series} />}
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
