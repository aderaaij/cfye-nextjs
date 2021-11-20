import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import ErrorPage from 'next/error';
import { ApolloClient } from '@apollo/client';
import { CategoryPostsOffsetQuery } from 'types';
import { initializeApollo } from '@/lib/apolloClient';
import { POSTS_QUERY_OFFSET } from '@/graphql/queries/posts_offset';
import { ALL_CATEGORIES } from '@/graphql/queries/allCategories';
import { Layout } from '@/components/Common';
import { TaxonomyPage } from '@/components/TaxonomyPage';

interface Props {
  data: CategoryPostsOffsetQuery;
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
    query: POSTS_QUERY_OFFSET,
    variables: {
      offset: (parseInt(params.page) - 1) * 20,
      size: 20,
      categoryName: params.slug,
      id: params.slug,
    },
  });

  return {
    props: {
      data: res.data,
    },
    // revalidate: 600,
  };
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const apolloClient: ApolloClient<any> = initializeApollo();
  const categoryData = await apolloClient.query({
    query: ALL_CATEGORIES,
  });

  const paths = [];
  categoryData.data.categories.edges.forEach(({ node }) => {
    const totalPages = Math.ceil(node.count / 20);
    for (let page = 2; page <= totalPages; page++) {
      paths.push(`/category/${node.slug}/${page}`);
    }
  });
  return {
    paths: paths,
    fallback: true,
  };
};
