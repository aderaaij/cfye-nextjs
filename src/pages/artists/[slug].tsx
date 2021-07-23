import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import { initializeApollo } from '@/lib/apolloClient';
import ErrorPage from 'next/error';
import {
  Post as GeneratedPostType,
  PostStatusEnum,
  PostFormatIdType,
  AristBySlugQuery,
  ArtistIdType,
} from 'types';
import { ALL_ARTISTS_WITH_SLUG_QUERY } from '@/graphql/queries/allArtistsWithSlug';
import { ARTIST_QUERY } from '@/graphql/queries/artistBySlug';
import { useQuery } from '@apollo/client';
import Layout from '@/components/Layout';
import MetaPage from '@/components/MetaPage';

interface Props {
  data: AristBySlugQuery;
  variables: {
    id: string | string[] | number;
    idType: ArtistIdType;
  };
}

const Artist: React.FC<Props> = () => {
  const router = useRouter();
  const isDatabaseId = !isNaN(Number(router.query.slug));

  const { data } = useQuery<AristBySlugQuery, Props['variables']>(
    ARTIST_QUERY,
    {
      variables: {
        id: isDatabaseId ? Number(router.query.slug) : router.query.slug,
        idType: isDatabaseId ? ArtistIdType.DatabaseId : ArtistIdType.Slug,
      },
    }
  );

  if (!data) {
    return <ErrorPage statusCode={501} />;
  }
  const { artist } = data;
  if (!router.isFallback && !artist?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  // if (error) return <ErrorPage statusCode={501} />;
  return (
    <Layout preview={false}>
      <MetaPage
        title={artist.title}
        description={data.artist.artistInformation.artistDescription}
        image={artist.featuredImage?.node?.sourceUrl}
      />
      <div className="content-width content-width--container">
        <div>
          <h1>{artist.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: data.artist.artistInformation.artistDescription,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Artist;

export const getStaticProps = async ({
  params,
  preview = false,
  previewData,
}): Promise<GetStaticPropsResult<any>> => {
  const apolloClient = initializeApollo();
  const postPreview: GeneratedPostType = preview && previewData?.post;
  const isId = Number.isInteger(Number(params.slug));
  const isSamePost = isId
    ? Number(params.slug) === Number(postPreview.id)
    : params.slug === postPreview.slug;
  const isDraft =
    isSamePost && postPreview?.status === PostStatusEnum.Draft.toLowerCase();

  // const isRevision =
  //   isSamePost && postPreview?.status === PostStatusEnum.Publish.toLowerCase();

  await apolloClient.query({
    query: ARTIST_QUERY,
    variables: {
      id: isDraft ? postPreview.id : params.slug,
      idType: isDraft ? PostFormatIdType.DatabaseId : PostFormatIdType.Slug,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      variables: {
        id: isDraft ? postPreview.id : params.slug,
        idType: isDraft ? PostFormatIdType.DatabaseId : PostFormatIdType.Slug,
      },
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const apolloClient: any = initializeApollo();
  const res = await apolloClient.query({
    query: ALL_ARTISTS_WITH_SLUG_QUERY,
  });

  return {
    paths:
      res.data.posts.edges.map(({ node }) => {
        if (node) {
          return `/artists/${node.slug}`;
        }
      }) || [],
    fallback: true,
  };
};
