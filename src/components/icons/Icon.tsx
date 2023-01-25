import React, { useState } from 'react';
import Tooltip from '../common/Tooltip';
import GithubIcon from './GithubIcon';
import PortfolioIcon from './PortfolioIcon';
import WebIcon from './WebIcon';

interface Props {
  type: TypeofIcon;
  children?: React.ReactNode;
  tooltip?: string;
}

type TypeofIcon = 'github' | 'portfolio' | 'website';

const Icon = ({ tooltip, type }: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="relative">
      <span
        className=" fill-zinc-300 hover:fill-gray-900 transition-all cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {getChild(type)}
      </span>
      {tooltip ? <Tooltip content={tooltip} hover={isHover} /> : null}
    </div>
  );
};

const getChild = (type: TypeofIcon) => {
  switch (type) {
    case 'github':
      return <GithubIcon />;
    case 'website':
      return <WebIcon />;
    case 'portfolio':
      return <PortfolioIcon />;
    default:
      throw new Error('type is required.');
  }
};

export default Icon;
