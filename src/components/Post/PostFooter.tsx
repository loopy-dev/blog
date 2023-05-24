import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { getPostComments, getPostHits } from '~/lib/api/post';
import Card from '~components/common/Card';
import { CardContent } from '~components/common/Card/Card';
import { SideBarProvider, useSideBarContext } from '~components/common/SideBar';
import SideBar from '~components/common/SideBar';
import Icon from '~components/icons';
import CommentIcon from '~components/icons/CommentIcon';
import ViewIcon from '~components/icons/ViewIcon';
import Comments from './Comments';
import styles from './Post.module.scss';
import { formatNumber, shuffle } from './utils';
import type { FrontMatter } from '~models/Post';

interface Props {
  url: string;
  recommendedPosts: FrontMatter[];
}

/**
 * NOTE - Suspense(dynamic) block이 내부에 존재한다면 hydration error가 발생
 */
const PostFooter = ({ url, recommendedPosts }: Props) => {
  return (
    <div
      className={classNames(
        'mt-16',
        'border-t',
        'pt-8',
        'border-zinc-500',
        'border-dashed'
      )}
    >
      {/** Recommended Posts section */}
      <RecommendedPostsContainer recommendedPosts={recommendedPosts} />
      {/** meta */}
      <MetaContainer url={url} />
      <CommentsContainer />
    </div>
  );
};

const PostFooterWithProvider = ({ url, recommendedPosts }: Props) => {
  return (
    <SideBarProvider>
      <PostFooter recommendedPosts={recommendedPosts} url={url} />
    </SideBarProvider>
  );
};

export default PostFooterWithProvider;

type MetaContainerProps = Pick<Props, 'url'>;

const MetaContainer = ({ url }: MetaContainerProps) => {
  const { open } = useSideBarContext();
  const [commentCounts, setCommentCounts] = useState<string | number>('...');
  const [hits, setHits] = useState('...');

  useEffect(() => {
    (async () => {
      const comments = await getPostComments(url);
      setCommentCounts(comments.comments);
    })();
  }, [url]);

  useEffect(() => {
    (async () => {
      try {
        const hitsData = await getPostHits(url);
        setHits(formatNumber(Number(hitsData.message)));
      } catch {
        // eslint-disable-next-line no-console
        console.log('hit is not available on development mode.');
      }
    })();
  }, [url]);

  return (
    <div className={classNames('hidden', 'md:flex', 'gap-4', 'w-full', 'mt-6')}>
      <div
        className={classNames(
          'inline-flex',
          'gap-0.5',
          'justify-between',
          'items-center',
          'text-zinc-500',
          'dark:text-zinc-400',
          'fill-zinc-500',
          'dark:fill-zinc-400',
          'hover:text-zinc-600',
          'hover:fill-zinc-600',
          'hover:dark:fill-zinc-300',
          'hover:dark:text-zinc-300',
          'cursor-pointer'
        )}
        onClick={() => {
          open();
        }}
      >
        {/** TODO - refactor Icon */}
        <span>
          <CommentIcon />
        </span>
        <span>{commentCounts}</span>
      </div>
      <div
        className={classNames(
          'inline-flex',
          'gap-0.5',
          'justify-between',
          'items-center',
          'text-zinc-500',
          'dark:text-zinc-400',
          'stroke-zinc-500',
          'dark:stroke-zinc-400',
          'hover:text-zinc-600',
          'hover:stroke-zinc-600',
          'hover:dark:stroke-zinc-300',
          'hover:dark:text-zinc-300',
          'fill-zinc-400',
          'cursor-pointer'
        )}
      >
        <span>
          <ViewIcon />
        </span>
        <span>{hits}</span>
      </div>
    </div>
  );
};

const CommentsContainer = () => {
  const { close } = useSideBarContext();
  return (
    <>
      {/** comments on mobile layout */}
      <Comments className="block md:hidden" />
      {/** sidebar */}
      <SideBar className="hidden md:block">
        <div className="mt-20 p-4">
          <div
            className={classNames('flex', 'justify-between', 'items-center')}
          >
            <h3
              className={classNames(
                'leading-normal',
                'font-medium',
                'text-2xl'
              )}
            >
              댓글
            </h3>
            <Icon
              className={classNames('cursor-pointer')}
              type="close"
              onClick={() => {
                close();
              }}
            />
          </div>
          <Comments />
        </div>
      </SideBar>
    </>
  );
};

type RecommendedPostsContainerProps = Pick<Props, 'recommendedPosts'>;

const RecommendedPostsContainer = ({
  recommendedPosts,
}: RecommendedPostsContainerProps) => {
  const [recommended, setRecommended] = useState<FrontMatter[]>([]);

  useEffect(() => {
    const shuffled = shuffle(recommendedPosts).slice(0, 4);
    setRecommended(shuffled);
  }, [recommendedPosts]);

  return (
    <section>
      <h2 className={classNames('text-3xl', 'font-semibold')}>추천 포스트</h2>
      <div
        className={classNames(
          'flex',
          'overflow-x-auto',
          'gap-4',
          'mt-4',
          styles['recommended-posts-section']
        )}
      >
        {recommended.map((post) => (
          <Card
            key={post.url}
            className={classNames(styles.card, 'flex-shrink-0')}
          >
            <Link
              href={`/posts/${post.url}`}
              className={classNames(
                'block',
                'h-full',
                'hover:bg-zinc-50',
                'bg-white',
                'dark:bg-zinc-700',
                'hover:dark:bg-zinc-600',
                'rounded'
              )}
            >
              <CardContent>
                <h3 className={classNames('font-medium', 'tracking-tight')}>
                  {post.title}
                </h3>
                <p
                  className={classNames(
                    'mt-2',
                    'leading',
                    'text-zinc-500',
                    'dark:text-zinc-300',
                    'text-sm'
                  )}
                >
                  {post.description}
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};
