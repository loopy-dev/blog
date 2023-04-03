import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';

interface HeaderProps {
  title: string;
  description?: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <Container>
      <h1>{title}</h1>
      {description && <h2>{description}</h2>}
    </Container>
  );
};

export default Header;

const Container = styled.header`
  margin: 32px 0;

  & h1 {
    margin: 1rem 0;
    font-weight: 700;
    font-size: 1.875rem /* 30px */;
    line-height: 2.25rem /* 36px */;
  }

  & h2 {
    color: ${cssVar('text3')};
  }
`;
