import { PrismAsyncLight } from 'react-syntax-highlighter';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';

const SyntaxHighlighter = ({
  children,
  language,
  ...props
}: SyntaxHighlighterProps) => {
  return (
    <PrismAsyncLight language={language} {...props}>
      {String(children).replace(/\n$/, '')}
    </PrismAsyncLight>
  );
};

export default SyntaxHighlighter;
