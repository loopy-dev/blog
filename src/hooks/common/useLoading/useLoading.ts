import { useCallback, useEffect, useState } from 'react';

const useLoading = (): [boolean, <T>(promise: Promise<T>) => Promise<T>] => {
  const [isLoading, setIsLoading] = useState(false);

  const startTransition = useCallback(async <T>(promise: Promise<T>) => {
    try {
      setIsLoading(true);
      const data = await promise;
      return data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  });

  return [isLoading, startTransition];
};

export default useLoading;
