import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { NetworkStatus, useQuery } from '@apollo/client';
import Container from '@/components/Container';
import HeroPost from '@/components/HeroPost';
import Layout from '@/components/Layout';
import { POSTS_QUERY } from '@/graphql/queries/posts';
import { ALL_CATEGORIES } from '@/graphql/queries/allCategories';
import { initializeApollo } from '@/lib/apolloClient';
import {
  RootQueryToCategoryConnection,
  RootQueryToPostConnection,
} from 'types';
import { useRouter } from 'next/router';

interface Data {
  posts: RootQueryToPostConnection;
  preview?: boolean;
}

interface AllPostQueryVars {
  after?: string;
  first: number;
  name?: string | string[];
}

export const allPostsQueryVars: AllPostQueryVars = {
  after: '',
  first: 10,
};

const Index: React.FC = () => {
  const router = useRouter();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { error, data, fetchMore, networkStatus } = useQuery<
    Data,
    AllPostQueryVars
  >(POSTS_QUERY, {
    variables: {
      after: '',
      first: 10,
      name: router.query.slug,
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  if (!data) {
    return <ErrorPage statusCode={501} />;
  }

  const { posts } = data;
  // const [count, setCount] = useState(null);

  // const loadMorePosts = (): void => {
  //   fetchMore({
  //     variables: {
  //       ...allPostsQueryVars,
  //       after: posts.pageInfo.endCursor,
  //     },
  //   });
  // };

  const isEven = (n: number): boolean => {
    return n % 2 == 0;
  };

  // useEffect((): void => {
  //   setCount(posts.edges.length - 1);
  // }, [posts]);

  // useEffect((): void => {
  //   if (inView) {
  //     loadMorePosts();
  //   }
  // }, [inView]);

  if (error) return <div>Error loading posts</div>;

  return (
    <Layout preview={false}>
      <Head>
        <title>CFYE | Crack For Your Eyes </title>
      </Head>
      <Container type="frontpage-grid">
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

export const getStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<any>> => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: POSTS_QUERY,
    variables: {
      ...allPostsQueryVars,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const apolloClient: any = initializeApollo();
  await apolloClient.query({
    query: ALL_CATEGORIES,
  });
  const edges: RootQueryToCategoryConnection['edges'] = apolloClient.cache.extract()
    .ROOT_QUERY.categories.edges;
  return {
    paths:
      edges.map(({ node }) => {
        if (node) {
          return `/category/${node.slug}`;
        }
      }) || [],
    fallback: true,
  };
};
