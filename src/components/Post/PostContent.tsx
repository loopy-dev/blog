import ReactMarkdown from 'react-markdown';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkFrontMatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import SyntaxHighlighter from './SyntaxHighlighter';

interface Props {
  content: string;
}

const Content = ({ content }: Props) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm, remarkFrontMatter]}
      components={{
        h1({ node, className, children, ...props }) {
          return (
            <h1
              className={className}
              {...props}
              style={{
                maxWidth: '100%',
                width: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                caretColor: 'rgb(55, 53, 47)',
                padding: '3px 2px',
                fontWeight: 600,
                fontSize: '1.875em',
                lineHeight: '1.3',
                marginTop: '1em',
              }}
            >
              {children}
            </h1>
          );
        },
        h2({ node, className, children, ...props }) {
          return (
            <h2
              className={className}
              {...props}
              style={{
                maxWidth: '100%',
                width: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                caretColor: 'rgb(55, 53, 47)',
                padding: '3px 2px',
                fontWeight: 600,
                fontSize: '1.5em',
                lineHeight: '1.3',
                marginTop: '1em',
              }}
            >
              {children}
            </h2>
          );
        },
        h3({ node, className, children, ...props }) {
          return (
            <h3
              className={className}
              {...props}
              style={{
                maxWidth: '100%',
                width: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                caretColor: 'rgb(55, 53, 47)',
                padding: '3px 2px',
                fontWeight: 600,
                fontSize: '1.25em',
                lineHeight: '1.3',
                marginTop: '1em',
              }}
            >
              {children}
            </h3>
          );
        },
        ul({ node, className, children, ordered, ...props }) {
          return (
            <ul
              style={{
                listStyleType: 'disc',
                padding: '3px 0 3px 32px',
                caretColor: 'rgb(55, 53, 47)',
                marginTop: '1px',
              }}
              {...props}
            >
              {children}
            </ul>
          );
        },
        ol({ node, className, children, ordered, ...props }) {
          return (
            <ol
              style={{
                listStyleType: 'decimal',
                marginLeft: '16px',
                padding: '3px 0 3px 32px',
                caretColor: 'rgb(55, 53, 47)',
                marginTop: '1px',
              }}
              {...props}
            >
              {children}
            </ol>
          );
        },
        li({ node, className, children, ordered, ...props }) {
          return (
            <li className={className} {...props} style={{ padding: '3px 2px' }}>
              {children}
            </li>
          );
        },
        p({ node, className, children, ...props }) {
          return (
            <p
              className={className}
              {...props}
              style={{
                maxWidth: '100%',
                width: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                caretColor: 'rgb(55, 53, 47)',
                padding: '3px 2px',
                marginTop: '1px',
              }}
            >
              {children}
            </p>
          );
        },
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
            <code
              className={className}
              style={{
                color: '#EB5757',
                backgroundColor: 'rgba(135,131,120,0.15)',
                borderRadius: '3px',
                fontSize: '85%',
                padding: '0.2em 0.4em',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              }}
              {...props}
            >
              {children}
            </code>
          );
        },
        blockquote({ node, className, children, ...props }) {
          return (
            <blockquote
              className={className}
              {...props}
              style={{
                display: 'flex',
                margin: '16px 0',
                width: '100%',
                borderLeft: '2px solid rgb(139, 108, 239)',
                backgroundColor: 'transparent',
                padding: '8px 16px',
                color: 'rgb(120, 119, 116)',
                fill: 'rgb(120, 119, 116)',
                fontSize: '1em',
              }}
            >
              {children}
            </blockquote>
          );
        },
        pre({ node, className, children, ...props }) {
          return (
            <pre
              className={className}
              {...props}
              style={{ wordBreak: 'break-all' }}
            >
              {children}
            </pre>
          );
        },
        table({ node, className, children, ...props }) {
          return (
            <div className="my-4">
              <table
                className={`border-collapse table-auto w-full text-sm ${className}`}
                {...props}
              >
                {children}
              </table>
            </div>
          );
        },
        th({ node, className, children, ...props }) {
          return (
            <th
              className={className}
              {...props}
              style={{
                background: 'rgb(247, 246, 243)',
                fontWeight: '600',
                padding: '7px 9px',
                border: '1px solid rgb(233, 233, 231)',
                position: 'relative',
                verticalAlign: 'top',
                textAlign: 'start',
                minWidth: '120px',
                maxWidth: '240px',
                minHeight: '32px',
              }}
            >
              {children}
            </th>
          );
        },
        td({ node, className, children, ...props }) {
          return (
            <td
              className={className}
              {...props}
              style={{
                color: 'inherit',
                fill: 'inherit',
                padding: '7px 9px',
                border: '1px solid rgb(233, 233, 231)',
                position: 'relative',
                verticalAlign: 'top',
                textAlign: 'start',
                minWidth: '120px',
                maxWidth: '240px',
                minHeight: '32px',
              }}
            >
              {children}
            </td>
          );
        },
        a({ node, className, children, ...props }) {
          return (
            <a
              className="text-blue-500"
              rel="noreferrer noopener"
              target="_blank"
              {...props}
            >
              {children}
            </a>
          );
        },
        img({ node, className, placeholder, ...props }) {
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          return <img style={{ margin: '16px auto' }} {...props} />;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Content;
