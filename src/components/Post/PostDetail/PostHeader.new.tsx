import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { BsFillPersonFill } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import useScroll from '~hooks/useScroll';
import { formatDate } from '../utils';
import BackgroundImage from './BackgroundImage';
import type { FrontMatter } from '~models/Post';

interface Props {
  postMetaData: FrontMatter;
}

const PostHeader = ({ postMetaData }: Props) => {
  const postDate = (() => {
    try {
      return formatDate(postMetaData.createdTime);
    } catch {
      return postMetaData.createdTime;
    }
  })();

  const [opacity, setOpacity] = useState(1);

  useScroll(() => {
    const newOpacity = 1 - window.scrollY / 600;

    setOpacity(newOpacity);
  });

  return (
    <BackgroundImage src={postMetaData.coverImage}>
      <div
        className={classNames(
          'relative',
          'mx-auto',
          'p-6',
          'max-w-5xl',
          'w-full',
          'h-full'
        )}
      >
        <div
          className={classNames(
            'flex',
            'flex-col',
            'justify-end',
            'w-full',
            'h-full'
          )}
        >
          <h1
            style={{ opacity }}
            className={classNames(
              'tracking-[-0.03em]',
              'whitespace-pre-wrap',
              'break-words',
              'font-bold',
              'leading-[1.3]',
              'text-white',
              'drop-shadow-md',
              'text-[3em]',
              'mt-[1em]'
            )}
          >
            {postMetaData.title}
          </h1>
          <p
            style={{ fontFamily: 'Noto Sans KR', opacity }}
            className={classNames(
              'text-neutral-200/90',
              'drop-shadow-md',
              'text-sm',
              'font-light',
              'mt-4'
            )}
          >
            {postMetaData.description}
          </p>
          <div className={classNames('flex', 'gap-4')}>
            <p
              style={{ fontFamily: 'Noto Sans KR', opacity }}
              className={classNames(
                'flex',
                'gap-1',
                'items-center',
                'text-neutral-200/90',
                'drop-shadow-md',
                'mt-2',
                'font-light',
                'text-sm'
              )}
            >
              <BsFillPersonFill />
              {'mrbartrns'}
            </p>
            <p
              style={{ fontFamily: 'Noto Sans KR', opacity }}
              className={classNames(
                'flex',
                'gap-1',
                'items-center',
                'text-neutral-200/90',
                'drop-shadow-md',
                'mt-2',
                'font-light',
                'text-sm'
              )}
            >
              <SlCalender />
              {postDate}
            </p>
          </div>
        </div>
      </div>
    </BackgroundImage>
  );
};

export default PostHeader;
