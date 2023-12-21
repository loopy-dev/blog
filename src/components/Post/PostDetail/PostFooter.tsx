import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineComment } from 'react-icons/ai';
import { BsShareFill } from 'react-icons/bs';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { getPostComments, getPostHits } from '~/lib/api/post';
import { notificate } from '~components/common/Alert';
import Card from '~components/common/Card';
import { CardContent } from '~components/common/Card/Card';
import SideBar, {
  SideBarProvider,
  useSideBarContext,
} from '~components/common/SideBar';
import Icon from '~components/icons';
import useClipboard from '~hooks/useClipboard';
import styles from '../Post.module.scss';
import { formatNumber, shuffle } from '../utils';
import Comments from './Comments';
import type { FrontMatter } from '~models/Post';

interface Props {
  url: string;
  recommendedPosts: FrontMatter[];
  category?: string;
}

/**
 * NOTE - Suspense(dynamic) block이 내부에 존재한다면 hydration error가 발생
 */
const PostFooter = ({ url, recommendedPosts, category = 'posts' }: Props) => {
  return (
    <div
      className={classNames(
        'mt-16',
        'border-t',
        'pt-8',
        'border-zinc-500',
        'border-dashed',
        styles.footer
      )}
    >
      {/** Recommended Posts section */}
      <RecommendedPostsContainer
        category={category}
        recommendedPosts={recommendedPosts}
      />
      {/** meta */}
      <MetaContainer url={url} />
      <CommentsContainer />
    </div>
  );
};

const PostFooterWithProvider = ({
  url,
  recommendedPosts,
  category = 'posts',
}: Props) => {
  return (
    <SideBarProvider>
      <PostFooter
        category={category}
        recommendedPosts={recommendedPosts}
        url={url}
      />
    </SideBarProvider>
  );
};

export default PostFooterWithProvider;

type MetaContainerProps = Pick<Props, 'url'>;

const MetaContainer = ({ url }: MetaContainerProps) => {
  const { open } = useSideBarContext();
  const pathname = usePathname();
  const [, writeText] = useClipboard();
  const [commentCounts, setCommentCounts] = useState<string | number>('...');
  const [hits, setHits] = useState('...');

  // useEffect(() => {
  //   (async () => {
  //     const comments = await getPostComments(url);
  //     setCommentCounts(comments.comments);
  //   })();
  // }, [url]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const hitsData = await getPostHits(url);
  //       setHits(formatNumber(Number(hitsData.message)));
  //     } catch {
  //       // eslint-disable-next-line no-console
  //       console.log('hit is not available on development mode.');
  //     }
  //   })();
  // }, [url]);

  return (
    <div
      className={classNames(
        'hidden',
        'md:flex',
        'gap-4',
        'w-full',
        'mt-6',
        'justify-between',
        'items-center'
      )}
    >
      <div className={classNames('flex', 'gap-4', 'items-center')}>
        <div
          className={classNames(
            'inline-flex',
            'justify-center',
            'items-center',
            'text-zinc-500',
            'dark:text-zinc-400',
            'hover:text-zinc-600',
            'hover:dark:text-zinc-300',
            'cursor-pointer'
          )}
          onClick={open}
        >
          {/** TODO - refactor Icon */}
          <span className={classNames('text-3xl', 'mr-1.5')}>
            <AiOutlineComment />
          </span>
          <span>{commentCounts}</span>
        </div>
        <div
          className={classNames(
            'inline-flex',
            'justify-center',
            'items-center',
            'text-zinc-500',
            'dark:text-zinc-400',
            'hover:text-zinc-600',
            'hover:dark:text-zinc-300',
            'cursor-pointer'
          )}
        >
          <span className={classNames('text-3xl', 'mr-1.5')}>
            <MdOutlineRemoveRedEye />
          </span>
          <span>{hits}</span>
        </div>
      </div>
      <div className={classNames('flex')}>
        <div
          className={classNames(
            'inline-flex',
            'justify-center',
            'items-center',
            'text-zinc-500',
            'dark:text-zinc-400',
            'hover:text-zinc-600',
            'hover:dark:text-zinc-300',
            'cursor-pointer'
          )}
          onClick={() => {
            const BASE_URL = window.location.origin;
            const url = BASE_URL.concat(pathname);
            writeText(url)?.then(
              () => {
                notificate(`링크가 복사되었습니다.`, 1500, 'success');
              },
              () => {
                notificate(
                  '알 수 없는 이유로 클립보드에 복사되지 않았습니다.',
                  1500,
                  'error'
                );
              }
            );
          }}
        >
          <span className={classNames('text-xl')}>
            <BsShareFill />
          </span>
        </div>
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

type RecommendedPostsContainerProps = Pick<
  Props,
  'recommendedPosts' | 'category'
>;

const RecommendedPostsContainer = ({
  recommendedPosts,
  category = 'posts',
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
              href={`/${category}/${post.url}`}
              className={classNames(
                'block',
                'h-full',
                'hover:bg-zinc-100',
                'bg-white',
                'dark:bg-zinc-800',
                'hover:dark:bg-zinc-700',
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
