import { useEffect, useRef } from 'react';

const useScroll = <F extends (...args: any[]) => any>(cb: F) => {
  const callbackRef = useRef(cb);

  useEffect(() => {
    const callback = callbackRef.current;

    window.addEventListener('scroll', callback);

    return () => {
      window.removeEventListener('scroll', callback);
    };
  }, []);

  return;
};

export default useScroll;
