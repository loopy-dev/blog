import classNames from 'classnames';
import dynamic from 'next/dynamic';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import PostHeaderWithImage from './PostHeader.new';
import PostSeries from './PostSeries';
import PostTemplate from './PostTemplate';

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
    <>
      {frontMatter.coverImage && (
        <PostHeaderWithImage postMetaData={{ ...frontMatter }} />
      )}
      <PostTemplate
        aside={<PostAside />}
        className={classNames({
          'mt-[552px]': frontMatter.coverImage,
        })}
        content={
          <>
            {!frontMatter.coverImage && (
              <PostHeader postMetaData={{ ...frontMatter }} />
            )}
            {/* {post.coverImage && (
              <PostThumbnail maxHeight="1024px" src={post.coverImage} />
            )} */}
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
    </>
  );
};

export default Post;
