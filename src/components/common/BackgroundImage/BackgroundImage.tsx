import type { CSSProperties } from 'react';
import { useState } from 'react';
import React from 'react';
import classNames from 'classnames';
import useIntersection from '~hooks/useIntersection';

interface Props {
  imageUrl?: string;
  altImage?: string;
  blockHeight?: string;
  children?: React.ReactNode;
}

// TODO - image 없을 때 처리, image 크기와 맞지 않을 때 이미지 위치, 최소 높이 처리 등
// TODO - image gradation 처리하기
const ImageItem = ({ imageUrl, blockHeight, altImage, children }: Props) => {
  const [lazyUrl, setLazyUrl] = useState(altImage);

  const ref = useIntersection<HTMLDivElement>((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setLazyUrl(imageUrl);

        if (!ref.current) return;

        observer.unobserve(ref.current);
      }
    });
  });

  const style: CSSProperties = {
    backgroundImage: imageUrl ? `url(${lazyUrl})` : altImage,
    minHeight: blockHeight,
  };

  return (
    <div
      ref={ref}
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
