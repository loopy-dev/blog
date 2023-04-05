import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';
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
          {content.title && <ContentTitle>{content.title}</ContentTitle>}
          {/** TODO - Date format 후 사용하기 */}
          {content.startDate && (
            <ContentDate>
              {content.startDate} ~ {content.endDate || '진행 중'}
            </ContentDate>
          )}
          {content.links && <PersonalInfo links={content.links} />}
        </>
      }
      right={
        <>
          {content.introduction && (
            <ContentIntroduction>{content.introduction}</ContentIntroduction>
          )}
          {content.description && (
            <ContentDescription>
              {content.description.map((description) =>
                typeof description === 'string' ? (
                  <li key={description}>{description}</li>
                ) : (
                  <li key={description.name}>{description.name}</li>
                )
              )}
            </ContentDescription>
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

const ContentTitle = styled.h2`
  font-weight: 700;
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
  padding: 4px 0;
`;

const ContentIntroduction = styled.h3`
  font-weight: 700;
  font-size: 1.15rem;
`;

const ContentDate = styled.p`
  margin-top: 16px;
  color: ${cssVar('text3')};
`;

const ContentDescription = styled.ul`
  margin: 1rem 0;
  list-style-type: disc;
  padding-left: 1rem;
  /* letter-spacing: -0.5px; */

  & li {
    padding: 3px 2px;
  }
`;
