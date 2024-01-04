import type { Metadata } from 'next';
import Script from 'next/script';
import { DEFAULT_PAGE_DESCRIPTION, DEFAULT_PAGE_TITLE } from '~lib/constants';
import { pageview, GA_TRACKING_ID } from '~/lib/ga/gtag';
import StyledComponentsRegistry from '~lib/registry/styled-components';
import '~lib/styles/globals.scss';
import '@radix-ui/themes/styles.css';

export const metadata: Metadata = {
  title: DEFAULT_PAGE_TITLE,
  description: DEFAULT_PAGE_DESCRIPTION,
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
        <title>{(metadata.title as string) || DEFAULT_PAGE_TITLE}</title>
        <meta
          key="title"
          content={(metadata.title as string) || DEFAULT_PAGE_TITLE}
          property="og:title"
        />
        <meta
          key="description"
          content={metadata.description ?? DEFAULT_PAGE_DESCRIPTION}
          property="og:description"
        />
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', {
          page_path: window.location.pathname
        });
      `,
          }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default Layout;
