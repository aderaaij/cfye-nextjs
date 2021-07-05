import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { ApolloClient } from '@apollo/client';
import { CategoryPostsOffsetQuery } from 'types';
import { initializeApollo } from '@/lib/apolloClient';
import { POSTS_QUERY_OFFSET } from '@/graphql/queries/posts_offset';
import { ALL_CATEGORIES } from '@/graphql/queries/allCategories';
import MetaPage from '@/components/MetaPage';
import Pagination from '@/components/Pagination';
import ExcerptHero from '@/components/ExcerptHero';
import Layout from '@/components/Layout';
import { returnPageString, returnSlugString } from 'utils/helpers';

interface Props {
  data: CategoryPostsOffsetQuery;
}
const CategoryPage: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <ErrorPage statusCode={501} />;
  }
  const router = useRouter();
  const { categoryPosts, categoryDetails } = data;
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
        <Pagination
          offsetPagination={categoryPosts.pageInfo.offsetPagination}
          slug={returnSlugString(router)}
          currentPage={parseInt(returnPageString(router))}
          taxonomy={'category'}
        />
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
    revalidate: 1,
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
    fallback: false,
  };
};
