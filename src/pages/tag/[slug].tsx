import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { Fragment } from 'react';
import { ApolloClient } from '@apollo/client';
import Container from '@/components/Container';
import HeroPost from '@/components/HeroPost';
import Layout from '@/components/Layout';
import { POSTS_QUERY } from '@/graphql/queries/posts';
import { ALL_TAGS } from '@/graphql/queries/allTags';
import { initializeApollo } from '@/lib/apolloClient';
import { RootQueryToPostConnection } from 'types';

interface Props {
  data: {
    categoryPosts: RootQueryToPostConnection;
  };
}
const Tag: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <ErrorPage statusCode={501} />;
  }
  const { categoryPosts } = data;

  const isEven = (n: number): boolean => {
    return n % 2 == 0;
  };

  return (
    <Layout preview={false}>
      <Head>
        <title>CFYE | Crack For Your Eyes </title>
      </Head>
      <Container type="frontpage-grid">
        {categoryPosts.edges.map(({ node }, index) => (
          <HeroPost key={node.id} post={node} isEven={isEven(index)} />
        ))}
      </Container>
    </Layout>
  );
};

export default Tag;

export const getStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<any>> => {
  const apolloClient = initializeApollo();
  const res = await apolloClient.query({
    query: POSTS_QUERY,
    variables: {
      after: '',
      first: 10,
      tagName: params.slug,
    },
  });

  return {
    props: {
      data: res.data,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const apolloClient: ApolloClient<any> = initializeApollo();
  const tagData = await apolloClient.query({
    query: ALL_TAGS,
  });
  return {
    paths:
      tagData.data.tags.edges.map(({ node }) => {
        return `/tag/${node.slug}`;
      }) || [],
    fallback: true,
  };
};
