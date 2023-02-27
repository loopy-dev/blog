import FadeInUp from '../common/FadeInUp';
import Activities from './Activities';
import Educations from './Educations';
import Hobbies from './Hobbies';
import Introduction from './Introduction';
import Projects from './Projects';

const Resume = () => {
  return (
    <>
      <FadeInUp>
        <Introduction />
      </FadeInUp>
      <Projects />
      <Educations />
      <Activities />
      <Hobbies />
    </>
  );
};

export default Resume;
