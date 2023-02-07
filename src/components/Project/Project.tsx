// TODO - prop으로 데이터 전달받아서 컴포넌트 재사용
import { Project } from '../../models/Project';
import ExperienceLayout from '../layouts/ExperienceLayout';
import OtherLinks from './OtherLinks';
import PersonalInfo from './PersonalInfo';
import Skills from './Skills';

interface Props {
  project: Project;
}

// TODO - refactoring(template)
const Project = ({ project }: Props) => {
  return (
    <ExperienceLayout
      sticky
      left={
        <>
          <h2 className="font-bold text-xl py-1">{project.title}</h2>
          {/** TODO - Date format 후 사용하기 */}
          <p className="pt-4 text-zinc-400">
            {project.startDate} ~ {project.endDate || '진행 중'}
          </p>
          <PersonalInfo links={project.links} />
        </>
      }
      right={
        <>
          <h3 className="font-bold mb-4 text-xl">{project.introduction}</h3>
          <ul className="my-4 list-disc pl-4">
            {project.description.map((description) =>
              typeof description === 'string' ? (
                <li key={description} className="py-1">
                  {description}
                </li>
              ) : (
                <li key={description.name} className="py-1">
                  {description.name}
                </li>
              )
            )}
          </ul>
          {/** 기술 스택 */}
          <Skills skills={project.skills} />
          <OtherLinks otherLinks={project.otherLinks} />
        </>
      }
    />
  );
};

export default Project;
