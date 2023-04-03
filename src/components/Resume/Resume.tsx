import dynamic from 'next/dynamic';
import FadeInUp from '../common/FadeInUp';

const Introduction = dynamic(() => import('./Introduction'));
const Body = dynamic(() => import('./Body'));

const Resume = () => {
  return (
    <>
      <FadeInUp>
        <Introduction />
      </FadeInUp>
      <Body />
    </>
  );
};

export default Resume;
