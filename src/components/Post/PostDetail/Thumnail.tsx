import React from 'react';
import classNames from 'classnames';

interface Props {
  alt?: string;
  src: string;
  maxHeight?: string;
}

const PostThumnail = ({ src, alt, maxHeight }: Props) => {
  return (
    <div
      className={classNames(
        'flex',
        'justify-center',
        'w-full',
        'sm:p-6',
        'mx-auto'
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={alt ? alt : 'thumnail'}
        className={classNames('object-cover', 'w-full')}
        loading="lazy"
        src={src}
        style={{ maxHeight }}
      />
    </div>
  );
};

export default PostThumnail;
