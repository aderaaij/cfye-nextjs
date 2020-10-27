import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import { AnimatePresence } from 'framer-motion';
import '../styles/index.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <AnimatePresence>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
