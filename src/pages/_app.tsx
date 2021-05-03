import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { AnimateSharedLayout } from 'framer-motion';

import { useApollo } from '../lib/apolloClient';
import SiteNav from '@/components/SiteNav/';
import '../styles/index.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SiteNav />
      <ApolloProvider client={apolloClient}>
        <AnimateSharedLayout>
          <Component {...pageProps} key={router.asPath} />
        </AnimateSharedLayout>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
