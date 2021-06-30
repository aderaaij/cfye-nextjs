import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { ApolloClient } from '@apollo/client';
import { CategoryPostsOffsetQuery } from 'types';
import { initializeApollo } from '@/lib/apolloClient';
import { POSTS_QUERY_OFFSET } from '@/graphql/queries/posts_offset';
import { ALL_TAGS } from '@/graphql/queries/allTags';
import MetaPage from '@/components/MetaPage';
import Pagination from '@/components/Pagination';
import ExcerptHero from '@/components/ExcerptHero';
import Layout from '@/components/Layout';

interface Props {
  data: CategoryPostsOffsetQuery;
}
const TagPage: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <ErrorPage statusCode={501} />;
  }
  const router = useRouter();
  const currentPage: string = Array.isArray(router.query.page)
    ? router.query.page[0]
    : router.query.page;

  const currentSlug: string = Array.isArray(router.query.slug)
    ? router.query.slug[0]
    : router.query.slug;

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
          slug={currentSlug}
          taxonomy={'tag'}
          currentPage={parseInt(currentPage)}
        />
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
    query: POSTS_QUERY_OFFSET,
    variables: {
      offset: (parseInt(params.page) - 1) * 20,
      size: 20,
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

  const paths = [];
  tagData.data.tags.edges.forEach(({ node }) => {
    console.log(node.count);
    const totalPages = Math.ceil(node.count / 20);
    console.log(totalPages);
    for (let page = 2; page <= totalPages; page++) {
      console.log(node.slug, page);
      paths.push(`/tag/${node.slug}/${page}`);
    }
  });
  return {
    paths: paths,
    fallback: false,
  };
};
