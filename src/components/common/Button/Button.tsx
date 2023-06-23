import type { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'transparent';
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
  size?: 'md' | 'lg' | 'xs';
  shape?: 'normal' | 'rounded';
  fullWidth?: boolean;
}

const Button = ({
  variant = 'primary',
  borderStyle = 'solid',
  size = 'md',
  shape = 'normal',
  fullWidth,
  children,
  className,
  ...props
}: Props) => {
  const classnames = classNames(
    styles['button'],
    styles[`button__bg-${variant}`],
    styles[`button__border-${borderStyle}`],
    styles[`button__size-${size}`],
    {
      [styles['button__full']]: fullWidth,
    },
    styles[`button__shape-${shape}`],
    'dark:border-transparent',
    className
  );

  return (
    <button className={classnames} {...props}>
      {children}
    </button>
  );
};

export default Button;
