import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '@/lib/apolloClient';
import { ALL_POSTS_WITH_SLUG_QUERY } from '@/graphql/queries/allPostsWithSlug';
import { ALL_ARTISTS_WITH_SLUG_QUERY } from '@/graphql/queries/allArtistsWithSlug';
import { DefaultOptions } from '@apollo/client';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient: any = initializeApollo();
  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };
  const postsQuery = await apolloClient.query({
    query: ALL_POSTS_WITH_SLUG_QUERY,
    fetchPolicy: 'no-cache',
    defaultOptions,
  });
  const artistsQuery = await apolloClient.query({
    query: ALL_ARTISTS_WITH_SLUG_QUERY,
    fetchPolicy: 'no-cache',
    defaultOptions,
  });

  const url = 'https://www.cfye.com';

  const postsFields = postsQuery?.data?.posts?.edges.map(({ node }) => {
    return {
      loc: `${url}/posts/${node.slug}`,
      lastmod: new Date(node.modified).toISOString(),
    };
  });

  const artistsFields = artistsQuery?.data?.artists?.edges.map(({ node }) => {
    return {
      loc: `${url}/artists/${node.slug}`,
      lastmod: new Date(node.modified).toISOString(),
    };
  });

  return getServerSideSitemap(ctx, [...artistsFields, ...postsFields]);
};

// Default export to prevent next.js errors
const params = {};
const Sitemap = (): any => params;

export default Sitemap;
