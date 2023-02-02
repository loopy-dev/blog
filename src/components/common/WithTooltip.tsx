import { useState } from 'react';
import type { HTMLAttributes } from 'react';
import Tooltip from './Tooltip';

interface Props extends HTMLAttributes<HTMLDivElement> {
  tooltip: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

const WithTooltip = ({
  tooltip,
  children,
  position = 'bottom',
  ...props
}: Props) => {
  const [isHover, setIsHover] = useState(false);
  const classNames = (props.className || '').concat(CLASSNAMES);
  return (
    <div className="relative">
      <span
        className={classNames}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {children}
      </span>
      {tooltip ? (
        <Tooltip content={tooltip} hover={isHover} position={position} />
      ) : null}
    </div>
  );
};

export default WithTooltip;

const CLASSNAMES =
  'fill-zinc-300 hover:fill-gray-900 transition-all cursor-pointer';
