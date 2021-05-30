import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { ApolloClient } from '@apollo/client';
import HeroPost from '@/components/HeroPost';
import Layout from '@/components/Layout';
import { POSTS_QUERY } from '@/graphql/queries/posts';
import { ALL_CATEGORIES } from '@/graphql/queries/allCategories';
import { initializeApollo } from '@/lib/apolloClient';
import { RootQueryToPostConnection } from 'types';

interface Props {
  data: {
    categoryPosts: RootQueryToPostConnection;
  };
}
const Category: React.FC<Props> = ({ data }) => {
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
      <div className="category-wrap">
        {categoryPosts.edges.map(({ node }, index) => (
          <HeroPost key={node.id} post={node} isEven={isEven(index)} />
        ))}
      </div>
    </Layout>
  );
};

export default Category;

export const getStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<any>> => {
  const apolloClient = initializeApollo();
  const res = await apolloClient.query({
    query: POSTS_QUERY,
    variables: {
      after: '',
      first: 10,
      categoryName: params.slug,
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
  const categoryData = await apolloClient.query({
    query: ALL_CATEGORIES,
  });
  return {
    paths:
      categoryData.data.categories.edges.map(({ node }) => {
        return `/category/${node.slug}`;
      }) || [],
    fallback: false,
  };
};
