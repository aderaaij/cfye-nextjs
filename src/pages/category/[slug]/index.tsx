import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import ErrorPage from 'next/error';
import { ApolloClient } from '@apollo/client';
import { CategoryPostsQuery } from 'types';
import { initializeApollo } from '@/lib/apolloClient';
import { POSTS_QUERY } from '@/graphql/queries/posts';
import { ALL_CATEGORIES } from '@/graphql/queries/allCategories';
import Layout from '@/components/Layout';
import TaxonomyPage from '@/components/TaxonomyPage';

interface Props {
  data: CategoryPostsQuery;
}
const CategoryPage: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <ErrorPage statusCode={501} />;
  }
  const { categoryPosts, categoryDetails } = data;
  return (
    <Layout preview={false}>
      <TaxonomyPage
        posts={categoryPosts}
        details={categoryDetails}
        taxonomy="category"
      />
    </Layout>
  );
};

export default CategoryPage;

export const getStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<any>> => {
  const apolloClient = initializeApollo();
  const res = await apolloClient.query({
    query: POSTS_QUERY,
    variables: {
      after: '',
      first: 20,
      categoryName: params.slug,
      id: params.slug,
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
