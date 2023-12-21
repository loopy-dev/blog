import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Noto_Sans_KR } from 'next/font/google';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkFrontMatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import Skeleton from '~components/common/Skeleton';
import postStyles from '../Post.module.scss';
import { setElementId } from '../utils';
import styles from './Markdown.module.scss';
import syntaxStyle from './syntaxStyle';

const SyntaxHighlighter = dynamic(() => import('./SyntaxHighlighter'), {
  loading: () => <Skeleton $noSpacing height="220px" width="100%" />,
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

const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

const isInImageDomainList = (url: string) => {
  const domainList = [
    'https://user-images.githubusercontent.com',
    'https://avatars.githubusercontent.com',
    'https://github.com',
  ];

  return domainList.some((domain) => url.startsWith(domain));
};

const Content = ({ content }: Props) => {
  return (
    <div
      className={classNames(
        'post-content',
        styles.block,
        postStyles.content,
        notoSans.className
      )}
    >
      <ReactMarkdown
        includeElementIndex
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm, remarkFrontMatter, remarkBreaks]}
        components={{
          h1({ index, children }) {
            return (
              <h1 data-index={index} id={`${setElementId(children)}-${index}`}>
                {children}
              </h1>
            );
          },
          h2({ index, children }) {
            return (
              <h2 data-index={index} id={`${setElementId(children)}-${index}`}>
                {children}
              </h2>
            );
          },
          h3({ index, children }) {
            return (
              <h3 data-index={index} id={`${setElementId(children)}-${index}`}>
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
                style={syntaxStyle}
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
                  // 'bg-zinc-100/80',
                  // 'dark:bg-zinc-700/80',
                  'italic',
                  'border-l-2',
                  'border-zinc-700',
                  'dark:border-zinc-300'
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
                  'gap-2',
                  'text-neutral-600',
                  'dark:text-neutral-200',
                  'sm:pl-[50px]',
                  'italic',
                  'text-2xl',
                  'leading-[1.48]',
                  'tracking-[-0.012em]'
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
