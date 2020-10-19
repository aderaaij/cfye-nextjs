import Head from 'next/head';
import ErrorPage from 'next/error';
import { NetworkStatus, useQuery } from '@apollo/client';
import Container from '@/components/Container';
import MoreStories from '@/components/MoreStories';
import HeroPost from '@/components/HeroPost';
import Intro from '@/components/Intro';
import Layout from '@/components/Layout';
import { POSTS_QUERY } from '@/graphql/queries/posts';
import { initializeApollo } from '@/lib/apolloClient';
import { RootQueryToPostConnection } from 'types';
import { GetStaticPropsResult } from 'next';

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
  const { loading, error, data, fetchMore, networkStatus } = useQuery<
    Data,
    AllPostQueryVars
  >(POSTS_QUERY, {
    variables: allPostsQueryVars,
    notifyOnNetworkStatusChange: true,
  });
  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;
  if (!data) {
    return <ErrorPage statusCode={501} />;
  }

  const { posts } = data;
  const heroPost = posts.edges[0]?.node;
  const morePosts = posts.edges.slice(1);
  let moreContentIsLoading = false;
  const loadMorePosts = (): void => {
    moreContentIsLoading = true;
    fetchMore({
      variables: {
        ...allPostsQueryVars,
        after: posts.pageInfo.endCursor,
      },
    });
  };

  if (error) return <div>Error loading posts</div>;

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

          <div className="flex items-center justify-center  h-24">
            <button
              onClick={() => loadMorePosts()}
              disabled={loadingMorePosts}
              className="flex mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              {' '}
              {loadingMorePosts && (
                <div className="loader mr-2 ease-linear rounded-full border-2 border-t-2 border-gray-200 h-6 w-6"></div>
              )}
              {loadingMorePosts ? 'Loading...' : 'Show More'}
            </button>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async (): Promise<GetStaticPropsResult<any>> => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: POSTS_QUERY,
    variables: allPostsQueryVars,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
