import React from 'react';
import classNames from 'classnames';

interface Props {
  alt?: string;
  src: string;
  maxHeight?: string;
}

const PostThumbnail = ({ src, alt, maxHeight }: Props) => {
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
        alt={alt ? alt : 'thumbnail'}
        className={classNames('object-cover', 'w-full')}
        // loading="lazy"
        src={src}
        style={{ maxHeight }}
        // TODO - 전체 커버 이미지로 교체 시 해당 부분 제거
      />
    </div>
  );
};

export default PostThumbnail;
