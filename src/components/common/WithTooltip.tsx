import React, { useState } from 'react';
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

  const childrenWithProps = React.isValidElement(children)
    ? React.cloneElement(children, {
        ...children.props,
        'data-ishover': isHover,
      })
    : children;

  return (
    <div className="relative">
      <span
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        {...props}
      >
        {childrenWithProps}
      </span>
      {tooltip ? (
        <Tooltip content={tooltip} hover={isHover} position={position} />
      ) : null}
    </div>
  );
};

export default WithTooltip;
