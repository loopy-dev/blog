import classNames from 'classnames';

interface HeaderProps {
  title: string;
  description?: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <header className={classNames('my-8')}>
      <h1 className={classNames('my-4', 'font-bold', 'text-3xl')}>{title}</h1>
      {description && (
        <h2 className={classNames('text-[color:var(--text3)]')}>
          {description}
        </h2>
      )}
    </header>
  );
};

export default Header;
