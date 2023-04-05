import { useState } from 'react';
import SkillButton from '../ContentTemplate/SkillButton';
import classes from './Skills.module.scss';
import type { Skill } from '../../../models/Resume';

interface Props {
  skills: Skill[];
}

const Skills = ({ skills }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <div className="flex items-baseline gap-8">
        <h3 className="font-bold text-xl my-4">사용 기술</h3>
      </div>
      <div
        className={`flex flex-wrap gap-2 mb-4 overflow-x-auto ${classes['scroll-hide']}`}
      >
        {skills.map((skill, index) => (
          <SkillButton
            key={skill.name}
            selected={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          >
            {skill.name}
          </SkillButton>
        ))}
      </div>
      <div>
        <h4 className="font-bold text-lg mt-2 mb-4">
          {skills[selectedIndex].name}
        </h4>
        {skills[selectedIndex].description.split('\n').map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </>
  );
};

export default Skills;
