import { GetStaticPropsResult } from 'next';
import ErrorPage from 'next/error';
import { FrontpagePostsQuery } from 'types';
import ExcerptHero from '@/components/ExcerptHero';
import Layout from '@/components/Layout';
import { FRONTPAGE_QUERY } from '@/graphql/queries/frontpage';
import { initializeApollo } from '@/lib/apolloClient';
import Excerpts from '@/components/Excerpts';
import FullWidthPost from '@/components/FullWidthPost';
import MetaPage from '@/components/MetaPage';
interface Props {
  data: FrontpagePostsQuery;
}

const Index: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <ErrorPage statusCode={501} />;
  }
  const {
    settings,
    stickyPosts,
    newWorkPosts,
    interviewsPosts,
    cfyeXPosts,
    featuresPosts,
  } = data;
  const featuredPost = stickyPosts?.edges[0].node;
  const featuredInterview = interviewsPosts?.edges[0]?.node;
  const featuredCfyeXPost = cfyeXPosts?.edges[0]?.node;

  return (
    <Layout preview={false}>
      <MetaPage
        title={settings.generalSettingsTitle}
        description={settings.generalSettingsDescription}
      />

      <div className="content-width content-width--container">
        {featuredPost && <ExcerptHero post={featuredPost} isEven={false} />}
        <Excerpts edges={newWorkPosts.edges} />

        {/* <hr className="fp-hr" /> */}

        <h2 className="section-title">Interviews</h2>
        {featuredInterview && (
          <ExcerptHero post={featuredInterview} isEven={true} />
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
        {featuresPosts && (
          <div className="full-width">
            <ExcerptHero post={featuresPosts?.edges[0].node} isEven={false} />
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
