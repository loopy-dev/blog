import type { HTMLAttributes } from 'react';
import useInfiniteScroll from './useInfiniteScroll';

interface Props extends HTMLAttributes<HTMLDivElement> {
  onIntersect?: () => void;
  unobserve?: boolean;
  threshold?: number;
}

const InfiniteScrollComponent = ({
  onIntersect,
  unobserve,
  threshold,
  ...props
}: Props) => {
  const ref = useInfiniteScroll<HTMLDivElement>(onIntersect, {
    unobserve,
    threshold,
  });
  return <div ref={ref} {...props} />;
};

export default InfiniteScrollComponent;
