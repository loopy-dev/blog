import dynamic from 'next/dynamic';
import FadeInUp from '../common/FadeInUp';

const Introduction = dynamic(() => import('./Introduction'));
const Projects = dynamic(() => import('./Projects'));
const Educations = dynamic(() => import('./Educations'));
const Activities = dynamic(() => import('./Activities'));
const Hobbies = dynamic(() => import('./Hobbies'));
const Prize = dynamic(() => import('./Prize'));

const Resume = () => {
  return (
    <>
      <FadeInUp>
        <Introduction />
      </FadeInUp>
      <Projects />
      <Educations />
      <Activities />
      <Prize />
      <Hobbies />
    </>
  );
};

export default Resume;
