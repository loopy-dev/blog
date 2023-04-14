import { useEffect } from 'react';
import useIntervalFn from './useIntervalFn';

const useInterval = (cb: () => unknown, delay = 0) => {
  const [run, stop] = useIntervalFn(cb, delay);

  useEffect(() => {
    run();
    return () => {
      stop();
    };
  }, [run, stop]);
};

export default useInterval;
