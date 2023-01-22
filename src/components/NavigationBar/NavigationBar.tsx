// TODO - 기능 붙이기
const NavigationBar = () => {
  return (
    <div
      className={`flex sticky md:flex-col md:h-screen md:fixed md:w-20 top-0 md:left-0 bg-gray-200 justify-between z-10 shadow-md`}
    >
      {/** top */}
      <div className="flex md:flex-col">
        <div className="md:w-full sm:w-20 sm:h-20 bg-gray-300 border-b flex items-center justify-center">
          Icon
        </div>
        <div className="md:w-full sm:w-20 sm:h-20 bg-gray-300 border-b flex items-center justify-center">
          Icon
        </div>
        <div className="md:w-full sm:w-20 sm:h-20 bg-gray-300 border-b flex items-center justify-center">
          Icon
        </div>
      </div>
      {/** bottom */}
      <div className="flex md:flex-col">
        <div className="md:w-full sm:w-20 sm:h-20 bg-gray-300 border-b flex items-center justify-center">
          Icon
        </div>
        <div className="md:w-full sm:w-20 sm:h-20 bg-gray-300 border-b flex items-center justify-center">
          Icon
        </div>
        <div className="md:w-full sm:w-20 sm:h-20 bg-gray-300 border-b flex items-center justify-center">
          Icon
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
