import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import ErrorPage from 'next/error';
import { ApolloClient } from '@apollo/client';
import Layout from '@/components/Layout';
import { POSTS_QUERY } from '@/graphql/queries/posts';
import { ALL_TAGS } from '@/graphql/queries/allTags';
import { initializeApollo } from '@/lib/apolloClient';
import { CategoryPostsQuery } from 'types';
import TaxonomyPage from '@/components/TaxonomyPage';

interface Props {
  data: CategoryPostsQuery;
}
const TagPage: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <ErrorPage statusCode={501} />;
  }
  const { categoryPosts, tagDetails } = data;
  return (
    <Layout preview={false}>
      <TaxonomyPage posts={categoryPosts} details={tagDetails} taxonomy="tag" />
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
    revalidate: 10,
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
