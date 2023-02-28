import Link from 'next/link';
import classNames from './Post.module.scss';
import type { PostMetaData } from '~/models/Post';

interface Props {
  post: PostMetaData;
}

// TODO - add props
const ListItem = ({ post }: Props) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className={classNames['list-item']}>
        {/** TODO - left: title, description; right: cover image */}
        <div className="flex flex-col gap-4 w-full">
          <h3 className={classNames['list-item__title']}>{post.title}</h3>
          <p
            className={`text-zinc-400 ${classNames['list-item__description']}`}
          >
            {post.description}
          </p>
        </div>
        {post.cover && (
          <div className={`${classNames.img} border-l shrink-0`}>사진</div>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
