import classNames from 'classnames';

interface Props {
  children?: React.ReactNode;
}

const Button = ({ children }: Props) => {
  return (
    <button className={classNames('bg-[var(--accent-6)]')}>{children}</button>
  );
};

export default Button;
