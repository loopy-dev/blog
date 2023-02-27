import { useCallback, useEffect, useRef } from 'react';

const useClickAway = <T extends HTMLElement>(
  onClick?: (e: MouseEvent) => void | Promise<void>
) => {
  const elementRef = useRef<T | null>(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const { current } = elementRef;

      if (!current) return;

      e.stopPropagation();

      if (!current.contains(e.target as Element)) onClick?.(e);
    },
    [onClick]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return elementRef;
};

export default useClickAway;
