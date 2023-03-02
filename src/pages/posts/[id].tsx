import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { getPostMarkdown } from '~/api/post';
import ContentLayout from '~/components/layouts/ContentLayout';
import GlobalLayout from '~/components/layouts/GlobalLayout';
import useLoading from '~/hooks/common/useLoading';
import postService from '~/services/post';
import type { GetServerSideProps } from 'next';
import type { Post } from '~/models/Post';

interface Props {
  postMetaData: Post;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = context.query.id;

    if (typeof id !== 'string') {
      return {
        notFound: true,
        message: id,
      };
    }

    const response = await postService.getMetaData(id);
    return {
      props: {
        postMetaData: response,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
// };

const Page = ({ postMetaData }: Props) => {
  const router = useRouter();
  const id = router.query.id;
  const [isLoading, startTransition] = useLoading();
  const [content, setContent] = useState<string>('');
  const date = new Date(postMetaData.createdTime);

  useEffect(() => {
    if (typeof id !== 'string') return;

    startTransition(
      (async () => {
        try {
          const response = await getPostMarkdown(id);
          setContent(response);
        } catch (error) {
          console.error(error);
        }
      })()
    );
  }, [id, startTransition]);

  return (
    <>
      <Head>
        <title>{postMetaData.title} - Blog</title>
      </Head>
      <GlobalLayout>
        <ContentLayout>
          {/** title */}
          <div className="my-16">
            <div
              className="title"
              style={{ marginTop: '2rem', marginBottom: '1.21875em' }}
            >
              <h1
                className="font-bold"
                style={{
                  maxWidth: '100%',
                  width: '100%',
                  letterSpacing: '-1px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  caretColor: 'rgb(55, 53, 47)',
                  padding: '3px 2px',
                  fontWeight: 600,
                  fontSize: '3em',
                  lineHeight: '1.3',
                  marginTop: '1em',
                }}
              >
                {postMetaData.title}
              </h1>
            </div>
            <div
              className="meta flex flex-row"
              style={{ justifyContent: 'space-between' }}
            >
              <p>
                by <span className="font-bold">mrbartrns</span>
              </p>
              <p className="italic text-slate-400">{`${date.getFullYear()}-${
                date.getMonth() + 1 < 10
                  ? `0${date.getMonth() + 1}`
                  : date.getMonth() + 1
              }-${
                date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
              }`}</p>
            </div>
          </div>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
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
              ul({ node, className, children, ...props }) {
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
              ol({ node, className, children, ...props }) {
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
              li({ node, className, children, ...props }) {
                return (
                  <li
                    className={className}
                    {...props}
                    style={{ padding: '3px 2px' }}
                  >
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
                  : '';
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
                      margin: '4px 0',
                      width: '100%',
                      borderRadius: '3px',
                      border: '1px solid rgba(55, 53, 47, 0.16)',
                      backgroundColor: 'transparent',
                      padding: '16px 16px 16px 12px',
                      color: 'rgb(120, 119, 116)',
                      fill: 'rgb(120, 119, 116)',
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
                  <div className="my-">
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
            }}
          >
            {content}
          </ReactMarkdown>
        </ContentLayout>
      </GlobalLayout>
    </>
  );
};

export default Page;
