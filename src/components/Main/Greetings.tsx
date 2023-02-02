import classNames from './Greetings.module.css';

const Greetings = () => {
  return (
    <div
      className={`${classNames.greetings} my-24 font-bold text-7xl leading-normal`}
    >
      <h1>안녕하세요,</h1>
      <h1>저는</h1>
      <h1>____한 개발자</h1>
      <h1>고준혁 입니다.</h1>
    </div>
  );
};

export default Greetings;
