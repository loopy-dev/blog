import classNames from 'classnames';

// TODO - color 추가
interface Props {
  width?: number;
  className?: string;
}

const ProgressBar = ({ width = 0, className }: Props) => {
  const barWidth = width < 0 ? 0 : width > 100 ? 100 : width;

  return (
    <div
      style={{ width: `${barWidth}%` }}
      className={classNames(
        'fixed',
        'h-0.5',
        'top-0',
        'left-0',
        'bg-[color:var(--primary)]',
        'z-[100]',
        'shadow-sm',
        className
      )}
    />
  );
};

export default ProgressBar;
