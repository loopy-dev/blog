import FadeInUp from '../common/FadeInUp';
import Activities from './Activities';
import Educations from './Educations';
import Hobbies from './Hobbies';
import Introduction from './Introduction';
import Projects from './Projects';

const Resume = () => {
  return (
    <div style={{ fontFamily: 'Pretendard-Regular' }}>
      <FadeInUp>
        <Introduction />
      </FadeInUp>
      <Projects />
      <Educations />
      <Activities />
      <Hobbies />
    </div>
  );
};

export default Resume;
