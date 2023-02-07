import OtherLinks from '../Project/OtherLinks';
import PersonalInfo from '../Project/PersonalInfo';
import ExperienceLayout from '../layouts/ExperienceLayout';
import type { Education } from '../../models/Project';

interface Props {
  activity: Education;
}

const Activity = ({ activity }: Props) => {
  return (
    <ExperienceLayout
      left={
        <>
          <h2 className="font-bold text-xl py-1">{activity.title}</h2>
          {/** TODO - Date format 후 사용하기 */}
          <p className="pt-4 text-zinc-400">
            {activity.startDate} ~ {activity.endDate || '진행 중'}
          </p>
          <PersonalInfo links={activity.links} />
        </>
      }
      right={
        <>
          <h3 className="font-bold text-xl mb-4">{activity.introduction}</h3>
          {activity.description && (
            <ul className="my-4 list-disc pl-4">
              {activity.description.map((description) =>
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
          {activity.otherLinks && (
            <OtherLinks otherLinks={activity.otherLinks} />
          )}
        </>
      }
    />
  );
};

export default Activity;
