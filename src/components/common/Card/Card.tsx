import type { HTMLAttributes } from 'react';
import classNames from 'classnames';

interface Props extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: number | string;
}

const Card = ({ maxWidth, children, className, ...props }: Props) => {
  return (
    <div
      style={{ maxWidth }}
      className={classNames(
        'border',
        'rounded',
        'w-full',
        'dark:border-transparent',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

interface CardMediaProps {
  src: string;
  height: number;
  alt?: string;
}

export const CardMedia = ({ src, alt, height }: CardMediaProps) => {
  return (
    <div
      className={classNames(
        'w-full',
        'overflow-hidden',
        'rounded',
        'rounded-b-none'
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={alt ? alt : 'card-image'}
        className={classNames('object-cover', 'w-full')}
        height={height}
        loading="lazy"
        src={src}
      />
    </div>
  );
};

interface CardContentProps {
  children?: React.ReactNode;
}

export const CardContent = ({ children }: CardContentProps) => {
  return <div className={classNames('p-4', 'h-full')}>{children}</div>;
};
