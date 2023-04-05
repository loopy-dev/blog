import { useState } from 'react';
import styled from 'styled-components';
import Tag from '~/components/common/Tag';
import type { Skill } from '~models/Resume';

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
      <SkillWrapper>
        {skills.map((skill, index) => (
          <Tag
            key={skill.name}
            label={skill.name}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </SkillWrapper>
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

const SkillWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;

  &::webkit-scrollbar {
    display: none;
  }
`;
