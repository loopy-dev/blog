import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

type OnDoneCallBackFn = () => void;

interface Props {
  duration?: number;
  message?: string;
  onDone?: OnDoneCallBackFn;
  id: string;
}

const AlertItem = ({ id, duration = 2000, message, onDone }: Props) => {
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
        'transition-all'
      )}
    >
      {message}
    </div>
  );
};

export default AlertItem;
