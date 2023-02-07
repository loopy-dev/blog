import { Education } from '../../models/Project';
import OtherLinks from '../Project/OtherLinks';
import ExperienceLayout from '../layouts/ExperienceLayout';

interface Props {
  education: Education;
}

const Education = ({ education }: Props) => {
  return (
    <ExperienceLayout
      left={
        <>
          <h2 className="font-bold text-xl py-1">{education.title}</h2>
          {/** TODO - Date format 후 사용하기 */}
          <p className="pt-4 text-zinc-400">
            {education.startDate} ~ {education.endDate || '진행 중'}
          </p>
        </>
      }
      right={
        <>
          <h3 className="font-bold text-xl mb-4">{education.introduction}</h3>
          {education.description && (
            <ul className="my-4 list-disc pl-4">
              {education.description.map((description) =>
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
          )}
          {education.otherLinks && (
            <OtherLinks otherLinks={education.otherLinks} />
          )}
        </>
      }
    />
  );
};

export default Education;
