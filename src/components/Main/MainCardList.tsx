import classNames from 'classnames';
import Link from 'next/link';
import Card, { CardContent } from '~components/common/Card';
import Tag from '~components/common/Tag';
import styles from '../Post/Post.module.scss';
import type { FrontMatter } from '~models/Post';

interface Props {
  category?: string;
  posts: FrontMatter[];
}

const MainCardList = ({ posts, category = 'posts' }: Props) => {
  return (
    <div
      className={classNames('flex', 'flex-wrap', 'gap-4', 'justify-between')}
    >
      {posts.map((post) => (
        <Card
          key={post.url}
          className={classNames(
            'w-full',
            'sm:w-[48%]',
            'h-[250px]',
            'hover:bg-zinc-100',
            'dark:hover:bg-zinc-500'
          )}
        >
          <CardContent>
            <div
              className={classNames(
                'h-full',
                'flex',
                'flex-col',
                'justify-between'
              )}
            >
              <Link href={`/${category}/${post.url}`}>
                <div>
                  <h3
                    className={classNames(
                      'font-medium',
                      'tracking-tight',
                      'text-lg'
                    )}
                  >
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
                </div>
              </Link>
              <div>
                <div className={classNames(styles['post-tags-container'])}>
                  {post.tags.map((tag) => (
                    <Tag
                      key={tag}
                      label={tag}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.nativeEvent.preventDefault();
                      }}
                    />
                  ))}
                </div>
                <p
                  className={classNames(
                    'mt-4',
                    'text-right',
                    'text-zinc-600',
                    'dark:text-zinc-300',
                    'text-[80%]',
                    'leading-[1.3]',
                    'tracking-[0.003em]'
                  )}
                >
                  {post.createdTime}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MainCardList;
