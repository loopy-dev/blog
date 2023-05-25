import { useCallback, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import AlertItem from './AlertItem';

type CreateAlertFn = (text?: string, duration?: number) => void;

const initialize = () => {
  let createAlertFn: CreateAlertFn | null = null;

  const bind = (fn: CreateAlertFn) => {
    createAlertFn = fn;
  };

  const notificate = (text?: string, duration?: number) => {
    if (!createAlertFn) return;

    createAlertFn(text, duration);
  };

  return { bind, notificate };
};

const { bind, notificate } = initialize();

export { bind, notificate };

type AlertState = {
  id: string;
  message?: string;
  duration?: number;
};

// NOTE - 일단 하나의 Alert만 출력되는 것으로 구성해보자
const AlertManager = () => {
  const [alerts, setAlerts] = useState<AlertState[]>([]);

  const createAlert = useCallback((message?: string, duration?: number) => {
    const newAlert: AlertState = { id: v4(), message, duration };
    setAlerts((prev) => [...prev, newAlert]);
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alertState) => alertState.id !== id));
  }, []);

  useEffect(() => {
    bind(createAlert);
  }, [createAlert]);

  return (
    <div>
      {alerts.map((alertState) => (
        <AlertItem
          key={alertState.id}
          duration={alertState.duration}
          id={alertState.id}
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
