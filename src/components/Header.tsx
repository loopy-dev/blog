import React from 'react';
import classNames from 'classnames';

interface HeaderProps {
  title: string;
  description?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = ({ title, description, right }: HeaderProps) => {
  return (
    <header
      className={classNames('my-8', 'flex', 'justify-between', 'items-end')}
    >
      <div>
        <h1 className={classNames('my-4', 'font-bold', 'text-3xl')}>{title}</h1>
        {description && (
          <h2 className={classNames('text-zinc-600', 'dark:text-zinc-300')}>
            {description}
          </h2>
        )}
      </div>
      {right}
    </header>
  );
};

export default Header;
