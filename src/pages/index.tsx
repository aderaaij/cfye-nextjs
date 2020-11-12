import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { GetStaticPropsResult } from 'next';
import ErrorPage from 'next/error';
import { NetworkStatus, useQuery } from '@apollo/client';
import Container from '@/components/Container';
import HeroPost from '@/components/HeroPost';
import Layout from '@/components/Layout';
import { POSTS_QUERY } from '@/graphql/queries/posts';
import { initializeApollo } from '@/lib/apolloClient';
import { RootQueryToPostConnection } from 'types';
import { motion, usePresence, Variants } from 'framer-motion';

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

const wrapperVariants: Variants = {
  exit: {
    opacity: 0,
  },
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
  },
};

const Index: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) safeToRemove();
  }, [isPresent]);

  const { error, data, fetchMore, networkStatus } = useQuery<
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
  const [count, setCount] = useState(null);

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

  useEffect((): void => {
    setCount(posts.edges.length - 1);
  }, [posts]);

  useEffect((): void => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView]);

  if (error) return <div>Error loading posts</div>;

  return (
    <motion.div exit="exit">
      <Layout preview={false}>
        <Head>
          <title>CFYE | Crack For Your Eyes </title>
        </Head>
        <Container>
          <div className="snap snap-both snap-mandatory lg:h-screen overflow-y-scroll">
            {posts.edges.map(({ node }, index) => {
              return (
                <Fragment key={node.id}>
                  <HeroPost
                    title={node.title}
                    isEven={isEven(index)}
                    key={node.id}
                    imageSettings={node.featuredImageSettings}
                    coverImage={node.featuredImage?.node}
                    date={node.date}
                    author={node.author.node}
                    slug={node.slug}
                    excerpt={node.excerpt}
                  />

                  {index === count - 2 && <div ref={ref} key={index}></div>}
                </Fragment>
              );
            })}
          </div>
          <div className="flex items-center w-full justify-center h-24 fixed bottom-0 left-0 ">
            {loadingMorePosts && (
              <div className="loader ease-linear rounded-full border-2 border-t-2 border-cfye h-12 w-12"></div>
            )}
          </div>
        </Container>
      </Layout>
    </motion.div>
  );
};

export default Index;

export const getStaticProps = async (): Promise<GetStaticPropsResult<any>> => {
  const apolloClient = initializeApollo();
  debugger;

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
