import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkFrontMatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import Skeleton from '~components/common/Skeleton';
import postStyles from '../Post.module.scss';
import { setElementId } from '../utils';
import styles from './Markdown.module.scss';

const SyntaxHighlighter = dynamic(() => import('./SyntaxHighlighter'), {
  loading: () => <Skeleton noSpacing height="220px" width="100%" />,
});

const Gist = dynamic(() => import('gist-react').then((module) => module.Gist), {
  ssr: false,
});
interface Props {
  content: string;
}

const transformLanguage = (language: string) => {
  switch (language) {
    case 'typescript':
      return 'tsx';
    case 'javascript':
      return 'jsx';
    case 'sass':
      return 'scss';
    default:
      return language;
  }
};

const isInImageDomainList = (url: string) => {
  const domainList = [
    'user-images.githubusercontent.com',
    'avatars.githubusercontent.com',
    'github.com',
  ];

  return domainList.some((domain) => url.startsWith(domain));
};

const Content = ({ content }: Props) => {
  return (
    <div
      className={classNames('post-content', styles.block, postStyles.content)}
    >
      <ReactMarkdown
        includeElementIndex
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm, remarkFrontMatter, remarkBreaks]}
        components={{
          h1({ index, children }) {
            return (
              <h1 data-index={index} id={setElementId(children)}>
                {children}
              </h1>
            );
          },
          h2({ index, children }) {
            return (
              <h2 data-index={index} id={setElementId(children)}>
                {children}
              </h2>
            );
          },
          h3({ index, children }) {
            return (
              <h3 data-index={index} id={setElementId(children)}>
                {children}
              </h3>
            );
          },
          code({
            node,
            inline,
            className,
            children,
            style,
            siblingCount,
            ...props
          }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? transformLanguage(match[1]) : 'text';
            return !inline && match ? (
              <SyntaxHighlighter
                PreTag="div"
                language={language}
                style={base16AteliersulphurpoolLight}
                customStyle={{
                  padding: '34px 16px 32px 32px',
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
          img({ node, src = '', alt = 'image', siblingCount, ...props }) {
            return isInImageDomainList(src) ? (
              <Image alt={alt} height={0} src={src} width={800} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={alt} loading="lazy" src={src} {...props} />
            );
          },
          // checking github gist
          div({ node, children }) {
            const gistId = node.properties?.dataGist;
            if (gistId && typeof gistId === 'string') {
              return <Gist gistId={gistId} />;
            }
            return <div>{children}</div>;
          },
          blockquote({ node, children, siblingCount, ...props }) {
            return (
              <blockquote
                className={classNames(
                  'bg-zinc-100',
                  'dark:bg-zinc-700',
                  'text-zinc-500',
                  'dark:text-zinc-300',
                  'italic'
                )}
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          aside({ node, children, siblingCount, ...props }) {
            return (
              <aside
                {...props}
                className={classNames(
                  'flex',
                  'border',
                  'dark:border-none',
                  'gap-2',
                  'dark:bg-zinc-700',
                  'text-zinc-500',
                  'dark:text-zinc-300',
                  'before:content-["📌"]'
                )}
              >
                {children}
              </aside>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Content;
