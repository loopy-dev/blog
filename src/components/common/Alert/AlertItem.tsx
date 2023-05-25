import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

type OnDoneCallBackFn = () => void;
type BgColor = 'success' | 'error' | 'primary';

interface Props {
  duration?: number;
  message?: string;
  onDone?: OnDoneCallBackFn;
  id: string;
  bgColor?: BgColor;
}

const AlertItem = ({
  id,
  duration = 2000,
  message,
  onDone,
  bgColor = 'success',
}: Props) => {
  const [isShowing, setIsShowing] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const onDoneRef = useRef(onDone);

  const disappear = useCallback(() => {
    setIsShowing(false);

    setTimeout(() => {
      onDoneRef.current?.();
    }, 250);
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      disappear();
    }, duration);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [disappear, duration, id]);

  return (
    <div
      className={classNames(
        { '-translate-y-44': !isShowing },
        'transition-all',
        'w-full',
        'text-white',
        'leading-normal',
        'first-of-type:mt-8',
        'p-2',
        'rounded',
        'shadow-md',
        {
          'bg-green-400': bgColor === 'success',
          'bg-[color:var(--primary)]': bgColor === 'primary',
          'bg-red-400': bgColor === 'error',
        }
      )}
    >
      {message}
    </div>
  );
};

export default AlertItem;
