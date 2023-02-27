interface Props {
  children?: React.ReactNode;
}

const SkeletonAnimation = ({ children }: Props) => {
  return <div className="animate-pulse">{children}</div>;
};

export default SkeletonAnimation;
