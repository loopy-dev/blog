import ReactMarkdown from 'react-markdown';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkFrontMatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { Block } from './MarkdownComponents';
import SyntaxHighlighter from './SyntaxHighlighter';

interface Props {
  content: string;
}

const Content = ({ content }: Props) => {
  return (
    <Block>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm, remarkFrontMatter]}
        components={{
          code({ node, inline, className, children, style, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match
              ? match[1] === 'typescript'
                ? 'tsx'
                : match[1] === 'javascript'
                ? 'jsx'
                : match[1]
              : 'text';
            return !inline && match ? (
              <SyntaxHighlighter
                PreTag="div"
                language={language}
                style={dracula}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} style={style} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Block>
  );
};

export default Content;
