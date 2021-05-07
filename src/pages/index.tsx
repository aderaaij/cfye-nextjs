import { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { RootQueryToPostConnection } from 'types';
import Container from '@/components/Container';
import HeroPost from '@/components/HeroPost';
import Layout from '@/components/Layout';
import { FRONTPAGE_QUERY } from '@/graphql/queries/frontpage';
import { initializeApollo } from '@/lib/apolloClient';

interface Props {
  data: {
    featuredPosts: RootQueryToPostConnection;
    newWorkPosts: RootQueryToPostConnection;
  };
}

const Index: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <ErrorPage statusCode={501} />;
  }
  const { featuredPosts, newWorkPosts } = data;

  const featuredPostNode = featuredPosts.edges[0].node;
  return (
    <Layout preview={false}>
      <Head>
        <title>CFYE | Crack For Your Eyes </title>
      </Head>
      <Container type="frontpage-grid">
        <HeroPost
          title={featuredPostNode.title}
          isEven={false}
          imageSettings={featuredPostNode.featuredImageSettings}
          coverImage={featuredPostNode.featuredImage?.node}
          date={featuredPostNode.date}
          author={featuredPostNode.author.node}
          slug={featuredPostNode.slug}
          excerpt={featuredPostNode.excerpt}
          categories={featuredPostNode.categories}
        />
        {newWorkPosts.edges.map(({ node }) => {
          return <article key={node.id}>{node.title}</article>;
        })}
      </Container>
    </Layout>
  );
};

export default Index;

export const getStaticProps = async (): Promise<GetStaticPropsResult<any>> => {
  const apolloClient = initializeApollo();

  const result = await apolloClient.query({
    query: FRONTPAGE_QUERY,
    variables: {
      after: '',
      first: 10,
    },
  });
  return {
    props: {
      data: result.data,
    },
  };
};
