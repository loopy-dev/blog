import { useCallback, useEffect, useRef } from 'react';

const useIntervalFn = (cb: () => unknown, delay = 0) => {
  const funcRef = useRef(cb);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const run = useCallback(() => {
    if (timer.current) clearInterval(timer.current);

    timer.current = setInterval(funcRef.current, delay);
  }, [delay]);

  const stop = useCallback(() => {
    () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  useEffect(
    () => () => {
      stop();
    },
    [stop]
  );

  return [run, stop];
};

export default useIntervalFn;
