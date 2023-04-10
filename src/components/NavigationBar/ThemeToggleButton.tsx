import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';
import useTheme from '~/lib/styles/useTheme';
import { Item } from './Item';
import type { Theme } from '~/lib/styles/types';

const ThemeToggleButton = () => {
  const [theme, toggle] = useTheme();

  return (
    <Item onClick={toggle}>
      <ThemeToggleIcon theme={theme} />
    </Item>
  );
};

interface ThemeToggleIconProps {
  theme?: Theme;
}

const ThemeToggleIcon = ({ theme }: ThemeToggleIconProps) => {
  return theme === 'dark' ? (
    <Container
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M22 15.8442C20.6866 16.4382 19.2286 16.7688 17.6935 16.7688C11.9153 16.7688 7.23116 12.0847 7.23116 6.30654C7.23116 4.77135 7.5618 3.3134 8.15577 2C4.52576 3.64163 2 7.2947 2 11.5377C2 17.3159 6.68414 22 12.4623 22C16.7053 22 20.3584 19.4742 22 15.8442Z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />{' '}
      </g>
    </Container>
  ) : (
    <Container
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />{' '}
      </g>
    </Container>
  );
};

export default ThemeToggleButton;

const Container = styled.svg`
  width: 24px;
  height: 24px;
  stroke: ${cssVar('text2')};
  user-select: none;
  transition: all 100ms cubic-bezier(0.31, 0.27, 0.15, 0.99) 0s;

  &:hover {
    stroke: ${cssVar('primary_light')};
  }
`;
