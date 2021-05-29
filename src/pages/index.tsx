import { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { RootQueryToPostConnection } from 'types';
import HeroPost from '@/components/HeroPost';
import Layout from '@/components/Layout';
import { FRONTPAGE_QUERY } from '@/graphql/queries/frontpage';
import { initializeApollo } from '@/lib/apolloClient';
import Excerpts from '@/components/Excerpts';
import FullWidthPost from '@/components/FullWidthPost';

interface Props {
  data: {
    stickyPosts: RootQueryToPostConnection;
    newWorkPosts: RootQueryToPostConnection;
    interviewsPosts: RootQueryToPostConnection;
    cfyeXPosts: RootQueryToPostConnection;
    featuresPosts: RootQueryToPostConnection;
  };
}

const Index: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <ErrorPage statusCode={501} />;
  }
  const {
    stickyPosts,
    newWorkPosts,
    interviewsPosts,
    cfyeXPosts,
    featuresPosts,
  } = data;

  const featuredPost = stickyPosts?.edges[0].node;
  const featuredInterview = interviewsPosts?.edges[0].node;
  const featuredCfyeXPost = cfyeXPosts?.edges[0].node;
  const featuredFeaturesPost = featuresPosts?.edges[0].node;

  return (
    <Layout preview={false}>
      <Head>
        <title>CFYE | Crack For Your Eyes </title>
      </Head>

      <div className="content-width content-width--container">
        {featuredPost && <HeroPost post={featuredPost} isEven={false} />}
        <Excerpts edges={newWorkPosts.edges} />

        <hr className="fp-hr" />

        <h2 className="section-title">Interviews</h2>
        {featuredInterview && (
          <HeroPost post={featuredInterview} isEven={true} />
        )}
        <Excerpts isEven={true} edges={interviewsPosts.edges.slice(1)} />
      </div>

      {featuredCfyeXPost && (
        <div className="content-width content-width--full">
          <FullWidthPost post={featuredCfyeXPost} />
        </div>
      )}

      <div className="content-width content-width--container">
        <h2 className="section-title">Features</h2>
        {featuredFeaturesPost && (
          <div className="full-width">
            <HeroPost post={featuredFeaturesPost} isEven={false} />
          </div>
        )}
        <Excerpts edges={featuresPosts.edges.slice(1)} />
      </div>
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
