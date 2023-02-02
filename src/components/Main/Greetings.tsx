import FadeInUp from '../common/FadeInUp';
import Slider from './Slider';

const characteristics = [
  '호기심 많은',
  '글 쓰는 것을 좋아하는',
  '항상 최선을 다하는',
];

const Greetings = () => {
  return (
    <FadeInUp>
      <div className="my-24 font-bold text-7xl leading-normal">
        <h1>안녕하세요,</h1>
        <h1>저는</h1>
        <h1>
          <Slider items={characteristics} /> 개발자
        </h1>
        <h1>고준혁 입니다.</h1>
      </div>
    </FadeInUp>
  );
};

export default Greetings;
