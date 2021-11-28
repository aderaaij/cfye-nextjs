import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';

import { useApollo } from '@/lib/apolloClient';
import { SiteNav, SiteMenu, Footer } from '@/components/Common';
import AppWrapper from '../contexts/MenuContext';
import { PlaiceholderProvider } from '../contexts/PlaiceholderContext';
import '../styles/index.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [isMenuActive, toggleMenu] = useState(false);
  const value = { isMenuActive, toggleMenu };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AppWrapper value={value}>
        <PlaiceholderProvider>
          <SiteNav />
          <SiteMenu />
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} key={router.asPath} />
            <Footer />
          </ApolloProvider>
        </PlaiceholderProvider>
      </AppWrapper>
    </>
  );
};

export default MyApp;
