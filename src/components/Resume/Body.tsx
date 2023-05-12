import { activities } from '~/data/activities';
import { educations } from '~/data/educations';
import { prize } from '~/data/prize';
import projects from '~/data/projects';
import Content from './Content';
import Hobbies from './Hobbies';

const Body = () => {
  return (
    <>
      <Content sticky contents={projects} title="Projects" />
      <Content contents={educations} title="Educations" />
      <Content contents={activities} title="Activities" />
      <Content contents={prize} title="Prize" />
      <Hobbies />
    </>
  );
};

export default Body;
