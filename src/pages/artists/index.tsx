import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { GetStaticPropsResult } from 'next';
import ErrorPage from 'next/error';
import { NetworkStatus, useQuery } from '@apollo/client';
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import ArtistsExcerpt from '@/components/ArtistsExcerpt';
import { ARTISTS_QUERY } from '@/graphql/queries/artists';
import { initializeApollo } from '@/lib/apolloClient';
import { RootQueryToArtistConnection } from 'types';

interface Data {
  artists: RootQueryToArtistConnection;
  preview?: boolean;
}

interface artistsQueryVars {
  after?: string;
  first: number;
}

export const artistsQueryVars: artistsQueryVars = {
  after: '',
  first: 400,
};

const Index: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { error, data, fetchMore, networkStatus } = useQuery<
    Data,
    artistsQueryVars
  >(ARTISTS_QUERY, {
    variables: artistsQueryVars,
    notifyOnNetworkStatusChange: true,
  });

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  if (!data) {
    return <ErrorPage statusCode={501} />;
  }

  const { artists } = data;
  const [count, setCount] = useState(null);

  const loadMorePosts = (): void => {
    fetchMore({
      variables: {
        ...artistsQueryVars,
        after: artists.pageInfo.endCursor,
      },
    });
  };

  const isEven = (n: number): boolean => {
    return n % 2 == 0;
  };

  useEffect((): void => {
    setCount(artists.edges.length - 1);
  }, [artists]);

  useEffect((): void => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView]);

  if (error) return <div>Error loading posts</div>;

  return (
    <Layout preview={false}>
      <Head>
        <title>CFYE | Crack For Your Eyes </title>
      </Head>
      <Container type="artists-grid">
        {artists.edges.map(({ node }, index) => {
          return (
            <Fragment key={node.id}>
              <ArtistsExcerpt
                title={node.title}
                image={node.featuredImage.node}
                slug={node.slug}
              />

              {/* {index === count - 2 && <div ref={ref} key={index}></div>} */}
            </Fragment>
          );
        })}
        {loadingMorePosts && <div>Load More</div>}
      </Container>
    </Layout>
  );
};

export default Index;

export const getStaticProps = async (): Promise<GetStaticPropsResult<any>> => {
  const apolloClient = initializeApollo();
  debugger;

  await apolloClient.query({
    query: ARTISTS_QUERY,
    variables: artistsQueryVars,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
