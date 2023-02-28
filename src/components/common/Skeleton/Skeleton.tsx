interface Props {
  // color?: 'default'
  shape?: 'circle' | 'rounded';
  animate?: 'pulse' | 'none';
  className?: string;
}

const SETTINGS = {
  pulse: 'animate-pulse',
  none: '',
};

/**
 * @description
 * skeleton component for loading state.
 * control width and height by className(tailwind css).
 */
const Skeleton = ({
  shape = 'rounded',
  className,
  animate = 'pulse',
}: Props) => {
  return (
    <div
      className={`inline-block ${
        animate ? SETTINGS[animate] : 'animate-pulse'
      } bg-slate-200 ${shape === 'circle' ? 'rounded-full' : 'rounded'} ${
        className || ''
      }`}
    />
  );
};

export default Skeleton;
