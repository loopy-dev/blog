import type { CSSProperties } from 'react';
import React from 'react';
import classNames from 'classnames';

interface Props {
  imageUrl?: string;
  altImage?: string;
  blockHeight?: string;
  children?: React.ReactNode;
  alt?: string;
  loading?: 'eager' | 'lazy';
}

// TODO - image 없을 때 처리, image 크기와 맞지 않을 때 이미지 위치, 최소 높이 처리 등
// TODO - image gradation 처리하기
const ImageItem = ({
  imageUrl,
  blockHeight,
  altImage,
  children,
  alt,
  loading,
}: Props) => {
  const style: CSSProperties = {
    minHeight: blockHeight,
  };

  return (
    <div
      style={style}
      className={classNames(
        'relative',
        'rounded-2xl',
        'transition-all',
        'bg-center',
        'bg-no-repeat',
        // NOTE - 임시 스타일
        'hover:shadow-lg'
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        alt={alt ? alt : 'image'}
        className={classNames('rounded-2xl')}
        loading={loading}
        src={imageUrl ? imageUrl : altImage}
      />
      {children}
    </div>
  );
};

export default ImageItem;
