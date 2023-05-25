import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Provider } from 'react-redux';
import { pageview, GA_TRACKING_ID } from '~/lib/ga/gtag';
import store from '~/lib/store';
import RouteProgressBar from '~components/Main/RouteProgressBar';
import AlertManager from '~components/common/Alert';
import '../lib/styles/globals.scss';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <Provider store={store}>
      <Head>
        <title>Benlog</title>
        <meta key="title" content="Benlog" property="og:title" />
        <meta
          key="description"
          content="Benlog입니다."
          property="og:description"
        />
      </Head>
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
      <RouteProgressBar />
      <Component {...pageProps} />
      <AlertManager width="640px" />
      <Analytics />
    </Provider>
  );
};

export default MyApp;
