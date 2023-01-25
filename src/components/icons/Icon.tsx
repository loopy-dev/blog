import React from 'react';
import GithubIcon from './GithubIcon';
import PortfolioIcon from './PortfolioIcon';
import WebIcon from './WebIcon';

interface Props {
  type: TypeofIcon;
  children?: React.ReactNode;
}

type TypeofIcon = 'github' | 'portfolio' | 'website';

const Icon = ({ type }: Props) => {
  return (
    <span className="fill-zinc-300 hover:fill-gray-900 transition-all cursor-pointer">
      {getChild(type)}
    </span>
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
