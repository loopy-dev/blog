import ExperienceLayout from '../../layouts/ExperienceLayout';
import OtherLinks from './OtherLinks';
import PersonalInfo from './PersonalInfo';
import Skills from './Skills';
import type { Resume } from '../../../models/Resume';

interface Props {
  content: Resume;
  sticky?: boolean;
}

const ContentTemplate = ({ content, sticky }: Props) => {
  return (
    <ExperienceLayout
      sticky={sticky}
      left={
        <>
          {content.title && (
            <h2 className="font-bold text-xl py-1">{content.title}</h2>
          )}
          {/** TODO - Date format 후 사용하기 */}
          {content.startDate && (
            <p className="pt-4 text-zinc-400">
              {content.startDate} ~ {content.endDate || '진행 중'}
            </p>
          )}
          {content.links && <PersonalInfo links={content.links} />}
        </>
      }
      right={
        <>
          {content.introduction && (
            <h3 className="font-bold mb-4 text-xl">{content.introduction}</h3>
          )}
          {content.description && (
            <ul className="my-4 list-disc pl-4">
              {content.description.map((description) =>
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
          {/** 기술 스택 */}
          {content.skills && <Skills skills={content.skills} />}
          {content.otherLinks && <OtherLinks otherLinks={content.otherLinks} />}
        </>
      }
    />
  );
};

export default ContentTemplate;
