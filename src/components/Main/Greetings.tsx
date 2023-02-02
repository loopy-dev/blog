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
      <div className="my-24 font-bold sm:text-4xl md:text-7xl text-2xl sm:leading-normal md:leading-normal leading-normal text-gray-800">
        <h1>안녕하세요,</h1>
        <h1>저는</h1>
        <h1>
          <span className="border-current border-b-2 md:border-b-4">
            <Slider items={characteristics} />
          </span>{' '}
          개발자
        </h1>
        <h1>고준혁 입니다.</h1>
      </div>
    </FadeInUp>
  );
};

export default Greetings;
