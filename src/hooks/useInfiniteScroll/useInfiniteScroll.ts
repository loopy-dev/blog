import useIntersection from '~hooks/useIntersection';

interface InfiniteScrollOptions {
  unobserve?: boolean;
  threshold?: number;
}

const useInfiniteScroll = <T extends HTMLElement>(
  cb?: () => void,
  options?: InfiniteScrollOptions
) => {
  const infinityScrollRef = useIntersection<T>(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cb?.();

          if (options?.unobserve && infinityScrollRef.current) {
            observer.unobserve(infinityScrollRef.current);
          }
        }
      });
    },
    { threshold: options?.threshold }
  );

  return infinityScrollRef;
};

export default useInfiniteScroll;
