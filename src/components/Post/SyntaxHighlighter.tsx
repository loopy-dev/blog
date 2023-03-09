import { PrismAsyncLight } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';

const SyntaxHighlighter = ({
  children,
  language,
  ...props
}: SyntaxHighlighterProps) => {
  return (
    <PrismAsyncLight
      PreTag="div"
      language={language}
      style={dracula}
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </PrismAsyncLight>
  );
};

export default SyntaxHighlighter;
