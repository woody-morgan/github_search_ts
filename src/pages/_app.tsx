import '@src/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { useEnvironment } from '@src/core/lib/relay';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactRelayContext } from 'react-relay';
import { ToastContainer } from 'react-toastify';

const App = ({ Component, pageProps, router }: AppProps) => {
  const environment = useEnvironment();

  return (
    <>
      <Head>
        <title>그린랩스</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      </Head>
      <ReactRelayContext.Provider value={{ environment }}>
        <Component {...pageProps} key={router.route} />
        <ToastContainer />
      </ReactRelayContext.Provider>
    </>
  );
};

export default App;
