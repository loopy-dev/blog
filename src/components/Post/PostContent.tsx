import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkFrontMatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import Skeleton from '../common/Skeleton';
import { Block } from './MarkdownComponents';

const SyntaxHighlighter = dynamic(() => import('./SyntaxHighlighter'), {
  loading: () => <Skeleton noSpacing height="220px" width="100%" />,
});
interface Props {
  content: string;
}

const Content = ({ content }: Props) => {
  return (
    <Block>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm, remarkFrontMatter, remarkBreaks]}
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
                style={base16AteliersulphurpoolLight}
                customStyle={{
                  padding: '24px',
                  fontSize: '14px',
                  borderRadius: '4px',
                  margin: 0,
                }}
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
          img({ node, ...props }) {
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            return <img {...props} loading="lazy" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Block>
  );
};

export default Content;
