import { useCallback, useEffect } from 'react';
import useTimeoutFn from './useTimeoutFn';

type Targs = any[];

const useDebounce = <F extends (...args: Targs) => any>(
  handler: F,
  delay = 300
) => {
  const [run, clear] = useTimeoutFn(handler, delay);

  const debounced = useCallback(
    (...args: Targs) => {
      clear();
      run(...args);
    },
    [clear, run]
  );

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  return debounced;
};

export default useDebounce;
