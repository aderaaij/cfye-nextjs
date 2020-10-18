import Head from 'next/head';
import ErrorPage from 'next/error';
import { NetworkStatus, useQuery, NormalizedCacheObject } from '@apollo/client';
import Container from '@/components/Container';
import MoreStories from '@/components/MoreStories';
import HeroPost from '@/components/HeroPost';
import Intro from '@/components/Intro';
import Layout from '@/components/Layout';
import { POSTS_QUERY } from '@/graphql/queries/POSTS_QUERY';
import { initializeApollo } from '@/lib/apolloClient';
import { RootQueryToPostConnection } from 'types';

interface Data {
  posts: RootQueryToPostConnection;
  preview?: boolean;
}

interface AllPostQueryVars {
  after?: string;
  first: number;
}

export const allPostsQueryVars: AllPostQueryVars = {
  after: '',
  first: 10,
};

const Index: React.FC = () => {
  const { loading, error, data, fetchMore, networkStatus, ...rest } = useQuery<
    Data,
    AllPostQueryVars
  >(POSTS_QUERY, {
    variables: allPostsQueryVars,
    notifyOnNetworkStatusChange: true,
  });

  if (!data) {
    return <ErrorPage statusCode={501} />;
  }

  const { posts } = data;
  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  const heroPost = posts.edges[0]?.node;
  const morePosts = posts.edges.slice(1);
  const loadMorePosts = (): void => {
    fetchMore({
      query: POSTS_QUERY,
      variables: {
        first: 10,
        after: posts.pageInfo.endCursor,
      },
    });
  };

  if (error) return <div>Error loading posts</div>;
  if (loading && !loadingMorePosts) return <div>Loading</div>;

  return (
    <>
      <Layout preview={false}>
        <Head>
          <title>Next.js Blog Example with {process.env.CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.featuredImage?.node}
              date={heroPost.date}
              author={heroPost.author.node}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {posts.edges.length > 0 && <MoreStories posts={morePosts} />}
          <button
            onClick={() => loadMorePosts()}
            disabled={loadingMorePosts}
            className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
          >
            {loadingMorePosts ? 'Loading...' : 'Show More'}
          </button>
        </Container>
      </Layout>
    </>
  );
};

export default Index;

interface StaticProps {
  props: {
    initialApolloState: NormalizedCacheObject['cache'];
    test234: string;
  };

  revalidate: number;
}

export const getStaticProps = async (): Promise<StaticProps> => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: POSTS_QUERY,
    variables: allPostsQueryVars,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      test234: 'bla',
    },

    revalidate: 1,
  };
};
