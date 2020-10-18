import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

let apolloClient;

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

function createApolloClient(): ApolloClient<any> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://cfye.com/wp/graphql',
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: relayStylePagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null): ApolloClient<any> {
  const _apolloClient = apolloClient ?? createApolloClient();
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState): any {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
