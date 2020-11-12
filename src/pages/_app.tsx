import { AppProps } from 'next/app';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import SiteNav from '@/components/SiteNav/';
import '../styles/index.css';

function handleExitComplete(): void {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 });
  }
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SiteNav />
      <ApolloProvider client={apolloClient}>
        <AnimatePresence
          initial={false}
          exitBeforeEnter
          onExitComplete={handleExitComplete}
        >
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
