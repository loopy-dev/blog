import type { HTMLAttributes } from 'react';
import BlogIcon from './BlogIcon';
import GithubIcon from './GithubIcon';
import MailIcon from './MailIcon';
import PortfolioIcon from './PortfolioIcon';
import ProjectIcon from './ProjectIcon';
import WebIcon from './WebIcon';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  type: TypeofIcon;
  children?: React.ReactNode;
  isHover?: boolean;
  'data-ishover'?: boolean;
}

type TypeofIcon =
  | 'github'
  | 'portfolio'
  | 'website'
  | 'mail'
  | 'blog'
  | 'project';

const Icon = ({ type, color, isHover, ...props }: Props) => {
  return (
    <span
      className={`transition-all fill-zinc-300 hover:fill-gray-900`}
      {...props}
    >
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
