import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { v4 } from 'uuid';
import AlertItem from './AlertItem';

type BgColor = 'success' | 'error' | 'primary';

type CreateAlertFn = (
  text?: string,
  duration?: number,
  bgColor?: BgColor
) => void;

const initialize = () => {
  let createAlertFn: CreateAlertFn | null = null;

  const bind = (fn: CreateAlertFn) => {
    createAlertFn = fn;
  };

  const notificate = (text?: string, duration?: number, bgColor?: BgColor) => {
    if (!createAlertFn) return;

    createAlertFn(text, duration, bgColor);
  };

  return { bind, notificate };
};

const { bind, notificate } = initialize();

export { bind, notificate };

type AlertState = {
  id: string;
  message?: string;
  duration?: number;
  bgColor?: BgColor;
};

interface Props {
  width?: string;
}

// NOTE - 일단 하나의 Alert만 출력되는 것으로 구성해보자
const AlertManager = ({ width = '320px' }: Props) => {
  const [alerts, setAlerts] = useState<AlertState[]>([]);

  const createAlert = useCallback(
    (message?: string, duration?: number, bgColor?: BgColor) => {
      const newAlert: AlertState = { id: v4(), message, duration, bgColor };
      setAlerts((prev) => [...prev, newAlert]);
    },
    []
  );

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alertState) => alertState.id !== id));
  }, []);

  useEffect(() => {
    bind(createAlert);
  }, [createAlert]);

  return (
    <div
      style={{ maxWidth: width }}
      className={classNames(
        'fixed',
        'left-1/2',
        'top-0',
        '-translate-x-1/2',
        'z-40',
        'pointer-events-none',
        'w-full',
        'px-2'
      )}
    >
      {alerts.map((alertState) => (
        <AlertItem
          key={alertState.id}
          bgColor={alertState.bgColor}
          duration={alertState.duration}
          message={alertState.message}
          onDone={() => {
            removeAlert(alertState.id);
          }}
        />
      ))}
    </div>
  );
};

export default AlertManager;
