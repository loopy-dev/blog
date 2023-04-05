import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import GlobalStyle from '~/lib/styles/GlobalStyle';
import store from '~/store';
import '../lib/styles/globals.css';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Head>
        <title>Benlog</title>
        <meta key="title" content="Benlog" property="og:title" />
        <meta
          key="description"
          content="Benlog입니다."
          property="og:description"
        />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </Provider>
  );
};

export default MyApp;
