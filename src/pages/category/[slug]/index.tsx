import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import ErrorPage from 'next/error';
import { ApolloClient } from '@apollo/client';
import { CategoryPostsQuery } from 'types';
import { initializeApollo } from '@/lib/apolloClient';
import { POSTS_QUERY } from '@/graphql/queries/posts';
import { ALL_CATEGORIES } from '@/graphql/queries/allCategories';
import MetaPage from '@/components/MetaPage';
import Pagination from '@/components/Pagination';
import ExcerptHero from '@/components/ExcerptHero';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { returnSlugString } from 'utils/helpers';

interface Props {
  data: CategoryPostsQuery;
}
const CategoryPage: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <ErrorPage statusCode={501} />;
  }
  const postCount = 20;
  const { categoryPosts, categoryDetails } = data;
  const { offsetPagination } = categoryPosts.pageInfo;
  const totalPages = Math.ceil(offsetPagination.total / postCount);
  const router = useRouter();
  const isEven = (n: number): boolean => {
    return n % 2 == 0;
  };
  return (
    <Layout preview={false}>
      {categoryDetails && (
        <MetaPage
          description={categoryDetails.description}
          title={categoryDetails.name}
        />
      )}
      <div className="category-wrap">
        {categoryPosts.edges.map(({ node }, index) => (
          <ExcerptHero key={node.id} post={node} isEven={isEven(index)} />
        ))}
        {totalPages > 1 && (
          <Pagination
            offsetPagination={offsetPagination}
            currentPage={1}
            taxonomy={'category'}
            slug={returnSlugString(router)}
          />
        )}
      </div>
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
