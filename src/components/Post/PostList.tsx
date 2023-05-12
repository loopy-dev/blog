import classNames from 'classnames';
import Link from 'next/link';
import Tag from '~components/common/Tag';
import styles from './Post.module.scss';
import type { FrontMatter } from '~models/Post';

interface Props {
  posts: FrontMatter[];
}

const PostList = ({ posts }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.title} post={post} />
      ))}
    </>
  );
};

export default PostList;

interface PostItemProps {
  post: FrontMatter;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <Link
      href={`/posts/${post.url}`}
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
          'text-[color:var(--text3)]',
          'text-[90%]',
          'tracking-[0.003em]'
        )}
      >
        {post.description}
      </p>
      <p
        className={classNames(
          'text-right',
          'text-[color:var(--text3)]',
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
