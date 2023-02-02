import { useState } from 'react';
import useIntersection from '../../hooks/common/useIntersection';
import classNames from './Greetings.module.css';

const Greetings = () => {
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
    { threshold: 0.5 }
  );

  return (
    <div
      ref={ref}
      className={`${
        isIntersecting ? classNames.greetings : 'opacity-0'
      } my-24 font-bold text-7xl leading-normal`}
    >
      <h1>안녕하세요,</h1>
      <h1>저는</h1>
      <h1>____한 개발자</h1>
      <h1>고준혁 입니다.</h1>
    </div>
  );
};

export default Greetings;
