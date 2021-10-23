import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '@/lib/apolloClient';
import {
  Post as GeneratedPostType,
  PostIdType,
  PostStatusEnum,
  PostFormatIdType,
  PostBySlugQuery,
  ArtistBySlugQuery,
  ArtistBySlugQueryVariables,
  ArtistIdType,
} from 'types';
import { ALL_ARTISTS_WITH_SLUG_QUERY } from '@/graphql/queries/allArtistsWithSlug';
import { ARTIST_QUERY } from '@/graphql/queries/artistBySlug';
import { returnSlugString } from 'utils/helpers';
import Layout from '@/components/Layout';
import PostTitle from '@/components/PostTitle';
import ArtistHero from '@/components/ArtistHero';
import ExcerptFeature from '@/components/ExcerptFeature';

interface Props {
  data: PostBySlugQuery;
  variables: {
    id: string;
    idType: PostIdType;
  };
}

const Artist: React.FC<Props> = () => {
  const router = useRouter();
  const isDatabaseId = !isNaN(Number(router.query.slug));
  const { error, data } = useQuery<
    ArtistBySlugQuery,
    ArtistBySlugQueryVariables
  >(ARTIST_QUERY, {
    variables: {
      id: returnSlugString(router),
      idType: isDatabaseId ? ArtistIdType.DatabaseId : ArtistIdType.Slug,
    },
  });

  if (!data) {
    return <ErrorPage statusCode={501} />;
  }

  const { artist } = data;
  if (!router.isFallback && !artist?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (error) return <ErrorPage statusCode={501} />;
  return (
    <>
      <Layout preview={false} pageType="artist">
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <div className="container container--bg-grey">
              <div className="container__content-width">
                <ArtistHero artist={artist} isEven={false} />
              </div>
            </div>
            <div className="container">
              <div className="container__content-width">
                {artist.artistInformation.relatedArticles.map((article) => {
                  return (
                    <ExcerptFeature
                      key={article.id}
                      post={article}
                      type="small"
                      isEven={false}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
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
    // revalidate: 600,
  };
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const apolloClient: any = initializeApollo();
  const res = await apolloClient.query({
    query: ALL_ARTISTS_WITH_SLUG_QUERY,
  });

  return {
    paths:
      res.data.artists.edges.map(({ node }) => {
        if (node) {
          return `/artists/${node.slug}`;
        }
      }) || [],
    fallback: true,
  };
};
