import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import SiteNav from '@/components/SiteNav/';
import SiteMenu from '@/components/SiteMenu/';
import Footer from '@/components/Footer';
import AppWrapper from '../contexts/MenuContext';
import '../styles/index.scss';
import { useState } from 'react';

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
        <SiteNav />
        <SiteMenu />
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} key={router.asPath} />
          <Footer />
        </ApolloProvider>
      </AppWrapper>
    </>
  );
};

export default MyApp;
