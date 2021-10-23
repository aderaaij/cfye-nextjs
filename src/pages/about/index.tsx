import { GetStaticPropsResult } from 'next';
import ErrorPage from 'next/error';
import { AboutPageQuery } from 'types';
import { initializeApollo } from '@/lib/apolloClient';
import Layout from '@/components/Layout';
import { ABOUT_QUERY } from '@/graphql/queries/aboutQuery';
import AboutHero from '@/components/AboutHero';
import MetaPage from '@/components/MetaPage';
interface Props {
  data: AboutPageQuery;
}

const Index: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <ErrorPage statusCode={501} />;
  }
  const { page } = data;
  return (
    <Layout preview={false} pageType="home">
      <MetaPage title={page.title} description={page.content} />

      <div className="container container--bg-grey">
        <div className="container__content-width">
          <AboutHero page={page} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export const getStaticProps = async (): Promise<GetStaticPropsResult<any>> => {
  const apolloClient = initializeApollo();

  const result = await apolloClient.query({
    fetchPolicy: 'no-cache',
    query: ABOUT_QUERY,
  });
  return {
    props: {
      data: result.data,
    },
    // revalidate: 600,
  };
};
