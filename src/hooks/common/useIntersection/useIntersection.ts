import { useEffect, useRef } from 'react';

const useIntersection = <T extends HTMLElement>(
  cb: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const ref = useRef<T | null>(null);
  const optionsRef = useRef(options);

  useEffect(() => {
    const io = new IntersectionObserver(cb, optionsRef.current);

    if (ref.current) {
      io.observe(ref.current);
    }

    return () => {
      io.disconnect();
    };
  }, [cb]);

  return ref;
};

export default useIntersection;
