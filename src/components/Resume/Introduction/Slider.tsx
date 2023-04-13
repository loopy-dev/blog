import { useState } from 'react';
import useInterval from '../../../hooks/common/useInterval/useInterval';
import classNames from './Slider.module.css';

interface Props {
  items: string[];
}

const Slider = ({ items }: Props) => {
  const [index, setIndex] = useState(0);

  useInterval(() => {
    setIndex((prev) => (prev + 1) % (items.length || 1));
  }, 2500);

  return (
    <ul className={classNames.rotator}>
      {items.map((item, idx) => (
        <li
          key={item}
          className={idx === index ? classNames.active : classNames.item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Slider;
