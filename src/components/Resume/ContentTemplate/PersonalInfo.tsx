import styled from 'styled-components';
import Icon from '../../icons/Icon';
import type { PersonalLink } from '../../../models/Resume';

interface Props {
  links: Partial<PersonalLink>;
}

const PersonalInfo = ({ links }: Props) => {
  return (
    <Container>
      {links.github && (
        <a href={links.github.url} rel="noopener noreferrer" target="_blank">
          <Icon type="github" />
        </a>
      )}
      {links.website && (
        <a href={links.website.url} rel="noopener noreferrer" target="_blank">
          <Icon type="website" />
        </a>
      )}
      {links.portfolio && (
        <a href={links.portfolio.url} rel="noopener noreferrer" target="_blank">
          <Icon type="portfolio" />
        </a>
      )}
    </Container>
  );
};

export default PersonalInfo;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 1rem 0;
`;
