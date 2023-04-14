import type { HTMLAttributes } from 'react';
import { useState } from 'react';
import useIntersection from '../../../hooks/useIntersection';
import classNames from './FadeInUp.module.css';

/**
 * @description
 * This is a component to apply FadeInUp animation to child component.
 * TODO - add more options
 */
const FadeInUp = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useIntersection<HTMLDivElement>(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && ref.current) {
          setIsIntersecting(true);
          observer.unobserve(ref.current);
        }
      });
    },
    { threshold: 0.1 }
  );

  return (
    <div
      ref={ref}
      className={`${props.className || ''} ${
        isIntersecting ? classNames.active : classNames.inactive
      }`}
      {...props}
    >
      {children}
    </div>
  );
};

export default FadeInUp;
