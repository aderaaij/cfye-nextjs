import Head from 'next/head';

import { GetStaticPropsResult } from 'next';
import ErrorPage from 'next/error';
import { motion } from 'framer-motion';
import { NetworkStatus, useQuery } from '@apollo/client';
import Container from '@/components/Container';
import MoreStories from '@/components/MoreStories';
import HeroPost from '@/components/HeroPost';
import Intro from '@/components/Intro';
import Layout from '@/components/Layout';
import { POSTS_QUERY } from '@/graphql/queries/posts';
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
  const loadMorePosts = (): void => {
    fetchMore({
      variables: {
        ...allPostsQueryVars,
        after: posts.pageInfo.endCursor,
      },
    });
  };

  const isEven = (n: number): boolean => {
    return n % 2 == 0;
  };

  if (error) return <div>Error loading posts</div>;

  return (
    <>
      <Layout preview={false}>
        <Head>
          <title>Next.js Blog Example with {process.env.CMS_NAME}</title>
        </Head>
        <Container>
          {/* <Intro /> */}
          <div className="snap snap-y snap-both snap-mandatory lg:h-screen overflow-y-scroll">
            {posts.edges.map(({ node }, index) => (
              <HeroPost
                title={node.title}
                isEven={isEven(index)}
                key={node.id}
                coverImage={node.featuredImage?.node}
                date={node.date}
                author={node.author.node}
                slug={node.slug}
                excerpt={node.excerpt}
              />
            ))}
          </div>
          <div className="flex items-center justify-center h-24 fixed bottom-0 left-0">
            <button
              onClick={() => loadMorePosts()}
              disabled={loadingMorePosts}
              className="flex mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
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
