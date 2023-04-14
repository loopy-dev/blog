import { PrismAsyncLight } from 'react-syntax-highlighter';
import styled from 'styled-components';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';

const filterMap: Record<string, string> = {
  jsx: 'JavaScript JSX',
  tsx: 'TypeScript JSX',
  bash: 'Bash',
  json: 'JSON',
};

const transformLanguage = (language: string | undefined) => {
  if (!language) return '';

  return filterMap[language] ? filterMap[language] : language;
};

const SyntaxHighlighter = ({
  children,
  language,
  ...props
}: SyntaxHighlighterProps) => {
  return (
    <Container>
      <div className="language-indicator">{transformLanguage(language)}</div>
      <PrismAsyncLight language={language} {...props}>
        {String(children).replace(/\n$/, '')}
      </PrismAsyncLight>
    </Container>
  );
};

export default SyntaxHighlighter;

const Container = styled.div`
  position: relative;

  & .language-indicator {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 1;
    font-size: 12px;
    font-family: sans-serif;
    line-height: 1;
    color: rgb(0, 0, 0, 0.5);
    opacity: 0;
    transition: all 100ms cubic-bezier(0.31, 0.27, 0.15, 0.99) 0s;
  }

  &:hover {
    & .language-indicator {
      opacity: 1;
    }
  }
`;
