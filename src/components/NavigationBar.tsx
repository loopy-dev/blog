interface Props {
  width?: number;
}
const NavigationBar = ({ width = 80 }: Props) => {
  return (
    <div
      className={`flex flex-col h-screen fixed min-w-${width} top-0 left-0 bg-gray-200`}
    >
      <div>1</div>
      <div>2</div>
    </div>
  );
};

export default NavigationBar;
