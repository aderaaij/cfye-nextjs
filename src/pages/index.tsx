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
  const { ref, inView } = useInView({
    threshold: 0,
  });

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
    <Layout preview={false}>
      <Head>
        <title>CFYE | Crack For Your Eyes </title>
      </Head>
      <Container>
        {posts.edges.map(({ node }, index) => {
          return (
            <Fragment key={node.id}>
              <HeroPost
                title={node.title}
                isEven={isEven(index)}
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
    query: POSTS_QUERY,
    variables: allPostsQueryVars,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
