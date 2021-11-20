import { GetStaticPropsResult } from 'next';
import ErrorPage from 'next/error';
import { FrontpagePostsQuery } from 'types';
import { FRONTPAGE_QUERY } from '@/graphql/queries/frontpage';
import { initializeApollo } from '@/lib/apolloClient';
import { PageMeta } from '@/components/Shared';
import { ExcerptsSmall, ExcerptFeature } from '@/components/PostExcerpts';
import { Layout } from '@/components/Common';
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
    featuresPosts,
  } = data;
  const featuredPost = stickyPosts?.edges[0].node;
  const featuredInterview = interviewsPosts?.edges[0]?.node;

  return (
    <Layout preview={false} pageType="home">
      <PageMeta
        title={settings.generalSettingsTitle}
        description={settings.generalSettingsDescription}
      />

      <div className="container container--bg-grey">
        <div className="container__content-width">
          <ExcerptFeature post={featuredPost} isEven={false} />
        </div>
      </div>

      {newWorkPosts?.edges.length && (
        <div className="container">
          <div className="container__content-width">
            <ExcerptsSmall edges={newWorkPosts.edges} rowSize={3} />
          </div>
        </div>
      )}

      {featuredInterview && (
        <div className="container container--bg-grey">
          <div className="container__content-width">
            <ExcerptFeature post={featuredInterview} isEven={false} />
          </div>
        </div>
      )}

      {interviewsPosts?.edges.length && (
        <div className="container">
          <div className="container__content-width">
            <ExcerptsSmall edges={interviewsPosts.edges.slice(1)} rowSize={3} />
          </div>
        </div>
      )}

      {featuresPosts && (
        <div className="container container--bg-grey">
          <div className="container__content-width">
            <ExcerptFeature post={featuresPosts.edges[0].node} isEven={false} />
          </div>
        </div>
      )}

      {featuresPosts?.edges.length && (
        <div className="container">
          <div className="container__content-width">
            <ExcerptsSmall edges={featuresPosts.edges.slice(1)} rowSize={3} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;

export const getStaticProps = async (): Promise<GetStaticPropsResult<any>> => {
  const apolloClient = initializeApollo();

  const result = await apolloClient.query({
    fetchPolicy: 'no-cache',
    query: FRONTPAGE_QUERY,
  });
  return {
    props: {
      data: result.data,
    },
    // revalidate: 600,
  };
};
