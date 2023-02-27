import { useEffect, useState } from 'react';

interface Props {
  delay?: number;
  children: React.ReactNode;
}

/**
 * @description
 * deffered component for early loading data
 * https://tech.kakaopay.com/post/skeleton-ui-idea/
 */
const DefferredComponent = ({ delay = 200, children }: Props) => {
  const [isDefferred, setIsDefferred] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setIsDefferred(true);
    }, delay);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [delay]);

  if (!isDefferred) return null;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default DefferredComponent;
