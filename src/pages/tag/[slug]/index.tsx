import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import ErrorPage from 'next/error';
import { ApolloClient } from '@apollo/client';
import ExcerptHero from '@/components/ExcerptHero';
import Layout from '@/components/Layout';
import { POSTS_QUERY } from '@/graphql/queries/posts';
import { ALL_TAGS } from '@/graphql/queries/allTags';
import { initializeApollo } from '@/lib/apolloClient';
import { CategoryPostsQuery } from 'types';
import MetaPage from '@/components/MetaPage';
import Pagination from '@/components/Pagination';

interface Props {
  data: CategoryPostsQuery;
}
const TagPage: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <ErrorPage statusCode={501} />;
  }
  const postCount = 20;
  const { categoryPosts, tagDetails } = data;
  const { offsetPagination } = categoryPosts.pageInfo;
  const totalPages = Math.ceil(offsetPagination.total / postCount);

  const isEven = (n: number): boolean => {
    return n % 2 == 0;
  };

  return (
    <Layout preview={false}>
      {tagDetails && (
        <MetaPage
          description={tagDetails.description}
          title={tagDetails.name}
        />
      )}
      <div className="category-wrap">
        {categoryPosts.edges.map(({ node }, index) => (
          <ExcerptHero key={node.id} post={node} isEven={isEven(index)} />
        ))}
        {totalPages > 1 && (
          <Pagination
            offsetPagination={categoryPosts.pageInfo.offsetPagination}
            slug={tagDetails.name.toLocaleLowerCase()}
            taxonomy={'tag'}
            currentPage={1}
          />
        )}
      </div>
    </Layout>
  );
};

export default TagPage;

export const getStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<any>> => {
  const apolloClient = initializeApollo();
  const res = await apolloClient.query({
    query: POSTS_QUERY,
    variables: {
      after: '',
      first: 20,
      tagName: params.slug,
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
