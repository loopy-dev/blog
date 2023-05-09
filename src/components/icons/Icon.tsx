import type { HTMLAttributes } from 'react';
import classNames from 'classnames';
import BlogIcon from './BlogIcon';
import CloseIcon from './CloseIcon';
import CommentIcon from './CommentIcon';
import GithubIcon from './GithubIcon';
import Hamburger from './Hamburger';
import MailIcon from './MailIcon';
import PortfolioIcon from './PortfolioIcon';
import ProjectIcon from './ProjectIcon';
import WebIcon from './WebIcon';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  type: TypeofIcon;
  children?: React.ReactNode;
  noHoverEffect?: boolean;
}

type TypeofIcon =
  | 'github'
  | 'portfolio'
  | 'website'
  | 'mail'
  | 'blog'
  | 'project'
  | 'hamburger'
  | 'close'
  | 'comment';

const Icon = ({ type, noHoverEffect, className, ...props }: Props) => {
  return (
    <span
      className={classNames(
        'inline-flex',
        'justify-center',
        'items-center',
        'fill-[color:var(--text4)]',
        {
          'hover:fill-[color:var(--text3)]': !noHoverEffect,
        },
        className
      )}
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
    case 'hamburger':
      return <Hamburger />;
    case 'close':
      return <CloseIcon />;
    case 'comment':
      return <CommentIcon />;
    default:
      throw new Error('type is required.');
  }
};

export default Icon;
