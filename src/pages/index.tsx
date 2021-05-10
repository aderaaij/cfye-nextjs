import { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { RootQueryToPostConnection } from 'types';
import Container from '@/components/Container';
import HeroPost from '@/components/HeroPost';
import Layout from '@/components/Layout';
import { FRONTPAGE_QUERY } from '@/graphql/queries/frontpage';
import { initializeApollo } from '@/lib/apolloClient';
import ExcerptsSmall from '@/components/ExcerptsSmall';

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

  const featuredPostNode = stickyPosts?.edges[0].node;
  const featuredInterview = interviewsPosts?.edges[0].node;
  const featuredCfyeXPost = cfyeXPosts?.edges[0].node;
  const featuredFeaturesPost = featuresPosts?.edges[0].node;
  return (
    <Layout preview={false}>
      <Head>
        <title>CFYE | Crack For Your Eyes </title>
      </Head>
      <Container type="frontpage-grid">
        {featuredPostNode && (
          <div className="full-width">
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
          </div>
        )}

        <hr className="fp-hr content-width" />
        <ExcerptsSmall title="New Work" edges={newWorkPosts.edges} />
        <hr className="fp-hr content-width" />

        <h2 className="content-width">Interviews</h2>
        {featuredInterview && (
          <div className="full-width">
            <HeroPost
              title={featuredInterview.title}
              isEven={true}
              imageSettings={featuredInterview.featuredImageSettings}
              coverImage={featuredInterview.featuredImage?.node}
              date={featuredInterview.date}
              author={featuredInterview.author.node}
              slug={featuredInterview.slug}
              excerpt={featuredInterview.excerpt}
              categories={featuredInterview.categories}
            />
          </div>
        )}
        <ExcerptsSmall edges={interviewsPosts.edges.slice(1)} />
        <hr className="fp-hr content-width" />
        {featuredCfyeXPost && (
          <div className="full-width">
            <HeroPost
              title={featuredCfyeXPost.title}
              isEven={false}
              imageSettings={featuredCfyeXPost.featuredImageSettings}
              coverImage={featuredCfyeXPost.featuredImage?.node}
              date={featuredCfyeXPost.date}
              author={featuredCfyeXPost.author.node}
              slug={featuredCfyeXPost.slug}
              excerpt={featuredCfyeXPost.excerpt}
              categories={featuredCfyeXPost.categories}
            />
          </div>
        )}
        <hr className="fp-hr content-width" />
        <h2 className="content-width">Features</h2>
        {featuredFeaturesPost && (
          <div className="full-width">
            <HeroPost
              title={featuredFeaturesPost.title}
              isEven={true}
              imageSettings={featuredFeaturesPost.featuredImageSettings}
              coverImage={featuredFeaturesPost.featuredImage?.node}
              date={featuredFeaturesPost.date}
              author={featuredFeaturesPost.author.node}
              slug={featuredFeaturesPost.slug}
              excerpt={featuredFeaturesPost.excerpt}
              categories={featuredFeaturesPost.categories}
            />
          </div>
        )}
        <ExcerptsSmall edges={featuresPosts.edges.slice(1)} />
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
