import type { LabelHTMLAttributes } from 'react';
import classNames from 'classnames';

const Label = ({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className={classNames(
        'block',
        'text-sm',
        'font-bold',
        'text-zinc-500',
        'dark:text-zinc-300',
        className
      )}
      {...props}
    />
  );
};

export default Label;
