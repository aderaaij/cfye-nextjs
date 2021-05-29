import { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { RootQueryToPostConnection } from 'types';
import HeroPost from '@/components/HeroPost';
import Layout from '@/components/Layout';
import { FRONTPAGE_QUERY } from '@/graphql/queries/frontpage';
import { initializeApollo } from '@/lib/apolloClient';
import ExcerptsSmall from '@/components/ExcerptsSmall';
import Excerpts from '@/components/Excerpts';
import FullWidthPost from '@/components/FullWidthPost';
import { truncate } from 'node:fs';

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
      <div className="content-width content-width--container">
        {featuredPostNode && (
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
            tags={featuredPostNode.tags}
          />
        )}
        <Excerpts edges={newWorkPosts.edges} />
        <hr className="fp-hr" />

        <h2 className="section-title">Interviews</h2>
        {featuredInterview && (
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
        )}
        <Excerpts isEven={true} edges={interviewsPosts.edges.slice(1)} />
      </div>
      {featuredCfyeXPost && (
        <div className="content-width content-width--full">
          <FullWidthPost
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

      <div className="content-width content-width--container">
        <h2 className="section-title">Features</h2>
        {featuredFeaturesPost && (
          <div className="full-width">
            <HeroPost
              title={featuredFeaturesPost.title}
              isEven={false}
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
