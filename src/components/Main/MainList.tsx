'use client';
import classNames from 'classnames';
import Link from 'next/link';
import ImageItem from './ImageItem';
import MainCardList from './MainCardList';
import type { FrontMatter } from '~models/Post';

interface Props {
  posts: FrontMatter[];
  category?: string;
}

const MainList = ({ category = 'posts', posts }: Props) => {
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
      <MainCardList posts={posts.slice(1)} />
    </div>
  );
};

export default MainList;
