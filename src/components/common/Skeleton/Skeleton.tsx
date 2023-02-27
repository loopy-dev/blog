interface Props {
  // color?: 'default'
  shape?: 'circle' | 'rounded';
  className?: string;
}

/**
 * @description
 * skeleton component for loading state.
 * control width and height by className(tailwind css).
 */
const Skeleton = ({ shape = 'rounded', className }: Props) => {
  return (
    <div
      className={`bg-slate-200 ${
        shape === 'circle' ? 'rounded-full' : 'rounded'
      } ${className || ''}`}
    />
  );
};

export default Skeleton;
