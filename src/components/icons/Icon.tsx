import type { HTMLAttributes } from 'react';
import React, { useState } from 'react';
import Tooltip from '../common/Tooltip';
import BlogIcon from './BlogIcon';
import GithubIcon from './GithubIcon';
import MailIcon from './MailIcon';
import PortfolioIcon from './PortfolioIcon';
import ProjectIcon from './ProjectIcon';
import WebIcon from './WebIcon';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  type: TypeofIcon;
  children?: React.ReactNode;
  tooltip?: string;
  color?: 'transparent' | 'white';
}

type TypeofIcon =
  | 'github'
  | 'portfolio'
  | 'website'
  | 'mail'
  | 'blog'
  | 'project';

const CLASSNAMES =
  'fill-zinc-300 hover:fill-gray-900 transition-all cursor-pointer';

const Icon = ({ tooltip, type, color, ...props }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const classNames = (props.className || '').concat(CLASSNAMES);
  return (
    <div className={`relative ${color === 'white' ? 'text-white' : ''}`}>
      <span
        className={classNames}
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
    case 'mail':
      return <MailIcon />;
    case 'blog':
      return <BlogIcon />;
    case 'project':
      return <ProjectIcon />;
    default:
      throw new Error('type is required.');
  }
};

export default Icon;
