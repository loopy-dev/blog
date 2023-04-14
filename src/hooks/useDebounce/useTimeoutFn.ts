import { useCallback, useRef } from 'react';

type RunFn = (...args: any[]) => any;
type ClearFn = () => void;
type Targs = any[];

const useTimeoutFn = <F extends (...args: Targs) => any>(
  handler: F,
  delay = 300
): [RunFn, ClearFn] => {
  const timerRef = useRef<number | null>(null);
  const delayRef = useRef(delay);
  const handlerRef = useRef(handler);

  const clear = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  const run = useCallback((...args: Targs) => {
    timerRef.current = window.setTimeout(async () => {
      await handlerRef.current(...args);
    }, delayRef.current);
  }, []);

  return [run, clear];
};

export default useTimeoutFn;
