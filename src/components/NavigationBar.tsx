// TODO - 기능 붙이기
const NavigationBar = () => {
  return (
    <div
      className={`flex flex-col h-screen fixed w-20 top-0 left-0 bg-gray-200 justify-between`}
    >
      {/** top */}
      <div>
        <div className="w-full h-20 bg-gray-300 border-b flex items-center justify-center">
          Icon
        </div>
        <div className="w-full h-20 bg-gray-300 border-b flex items-center justify-center">
          Icon
        </div>
        <div className="w-full h-20 bg-gray-300 border-b flex items-center justify-center">
          Icon
        </div>
      </div>
      {/** bottom */}
      <div>
        <div className="w-full h-20 bg-gray-300 border-b flex items-center justify-center">
          Icon
        </div>
        <div className="w-full h-20 bg-gray-300 border-b flex items-center justify-center">
          Icon
        </div>
        <div className="w-full h-20 bg-gray-300 border-b flex items-center justify-center">
          Icon
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
