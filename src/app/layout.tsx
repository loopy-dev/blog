import type { Metadata } from 'next';
import StyledComponentsRegistry from '~lib/registry/styled-components';
import '~lib/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Belong',
  description: 'Benlog입니다.',
};

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <html lang="ko">
      <head>
        <link
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default Layout;
