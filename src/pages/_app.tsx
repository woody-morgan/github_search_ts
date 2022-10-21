import '@src/styles/globals.css';

import { AppProps } from 'next/app';
import Head from 'next/head';

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <Head>
        <title>그린랩스</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      </Head>
      <Component {...pageProps} key={router.route} />
    </>
  );
};

export default App;
