import classNames from 'classnames';

interface Props {
  width?: number;
}

const ProgressBar = ({ width = 0 }: Props) => {
  const barWidth = width < 0 ? 0 : width > 100 ? 100 : width;

  return (
    <div
      style={{ width: `${barWidth}%` }}
      className={classNames(
        'fixed',
        'h-1',
        'top-0',
        'left-0',
        'bg-[color:var(--primary)]',
        'z-[100]'
      )}
    />
  );
};

export default ProgressBar;
