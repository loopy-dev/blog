import type { CSSProperties } from 'react';
import React from 'react';
import classNames from 'classnames';

interface Props {
  imageUrl?: string;
  altImage?: string;
  blockHeight?: string;
  children?: React.ReactNode;
}

// TODO - image 없을 때 처리, image 크기와 맞지 않을 때 이미지 위치, 최소 높이 처리 등
const ImageItem = ({ imageUrl, blockHeight, altImage, children }: Props) => {
  const style: CSSProperties = {
    backgroundImage: imageUrl ? `url(${imageUrl})` : altImage,
    minHeight: blockHeight,
  };

  return (
    <div
      style={style}
      className={classNames(
        'border',
        'rounded-2xl',
        'p-4',
        'transition-all',
        'bg-center',
        'bg-no-repeat'
      )}
    >
      {children}
    </div>
  );
};

export default ImageItem;
