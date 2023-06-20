import classNames from 'classnames';
import Link from 'next/link';
import Card from '~components/common/Card';
import { CardContent } from '~components/common/Card/Card';
import Tag from '~components/common/Tag';
import styles from '../Post.module.scss';
import ImageItem from './ImageItem';
import type { FrontMatter } from '~models/Post';

interface Props {
  posts: FrontMatter[];
  category?: string;
}

const PostList = ({ category = 'posts', posts }: Props) => {
  return (
    <div className={classNames('lg:mt-4')}>
      {
        <Link
          className={classNames('mb-4', 'block')}
          href={`/${category}/${posts[0].url}`}
        >
          <ImageItem post={posts[0]} />
        </Link>
      }
      <div
        className={classNames('flex', 'flex-wrap', 'gap-4', 'justify-between')}
      >
        {posts.map(
          (post, index) =>
            index > 0 && (
              // <PostItem key={post.title} category={category} post={post} />
              <Card
                key={post.url}
                className={classNames('w-full', 'sm:w-[48%]', 'h-[250px]')}
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
                    <div>
                      <div
                        className={classNames(styles['post-tags-container'])}
                      >
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
            )
        )}
      </div>
    </div>
  );
};

export default PostList;

interface PostItemProps {
  post: FrontMatter;
  category?: string;
}

const PostItem = ({ post, category = 'posts' }: PostItemProps) => {
  return (
    <Link
      href={`/${category}/${post.url}`}
      className={classNames(
        'flex',
        'flex-col',
        'gap-2',
        'w-full',
        'pt-1',
        'pb-3',
        'min-h-[150px]',
        'border-b',
        'border-[rbga(0, 0, 0, 0.1)]',
        'last-of-type:border-none'
      )}
    >
      <h3
        className={classNames(
          'font-bold',
          'text-[1.5em]',
          'mt-6',
          'mb-[0.3rem]',
          'tracking-[-1px]'
        )}
      >
        {post.title}
      </h3>
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
          'mt-2',
          'text-zinc-600',
          'dark:text-zinc-300',
          'text-[90%]',
          'tracking-[0.003em]'
        )}
      >
        {post.description}
      </p>
      <p
        className={classNames(
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
    </Link>
  );
};
