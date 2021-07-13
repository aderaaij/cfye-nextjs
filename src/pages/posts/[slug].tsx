import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { motion } from 'framer-motion';
import cx from 'classnames';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '@/lib/apolloClient';
import {
  Post as GeneratedPostType,
  PostIdType,
  PostStatusEnum,
  PostFormatIdType,
  PostBySlugQuery,
} from 'types';
import { POST_QUERY } from '@/graphql/queries/postBySlug';
import { ALL_POSTS_WITH_SLUG_QUERY } from '@/graphql/queries/allPostsWithSlug';
import MetaPage from '@/components/MetaPage';
import PostBody from '@/components/PostBody';
import PostHeader from '@/components/PostHeader';
import Layout from '@/components/Layout';
import PostTitle from '@/components/PostTitle';
import styles from './Post.module.scss';
import ArtistSummary from '@/components/ArtistSummary';

interface Props {
  data: PostBySlugQuery;
  variables: {
    id: string | number;
    idType: PostIdType;
  };
}

const Post: React.FC<Props> = ({ variables }) => {
  const router = useRouter();
  const isDatabaseId = !isNaN(Number(router.query.slug));
  const { error, data } = useQuery(POST_QUERY, {
    variables: {
      id: isDatabaseId ? Number(router.query.slug) : router.query.slug,
      idType: isDatabaseId ? PostIdType.DatabaseId : PostIdType.Slug,
    },
  });

  if (!data) {
    return <ErrorPage statusCode={501} />;
  }

  const { post } = data;

  if (
    variables.idType !== PostIdType.DatabaseId &&
    !router.isFallback &&
    !post?.slug
  ) {
    return <ErrorPage statusCode={404} />;
  }

  if (error) return <ErrorPage statusCode={501} />;
  return (
    <>
      <Layout preview={false}>
        <MetaPage
          title={post.title}
          description={post.excerpt}
          image={post.featuredImage?.node?.sourceUrl}
        />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <motion.article
              // initial={{ scale: 0.8, opacity: 0 }}
              // animate={{ scale: 1, opacity: 1 }}
              layoutId={`article-${post.slug}`}
              className={styles['article']}
            >
              <PostHeader
                title={post.title}
                slug={post.slug}
                coverImage={post.featuredImage?.node}
                date={post.date}
                author={post.author?.node}
                categories={post.categories}
                featuredImageSettings={post.featuredImageSettings}
              />

              <PostBody blocks={post.blocks} content={post.content} />
              <footer className={cx(styles['footer'], 'main-grid')}>
                {post.postSettingsField?.artistPost?.length && (
                  <ArtistSummary
                    artist={post.postSettingsField?.artistPost[0]}
                  />
                )}
              </footer>
            </motion.article>
          </>
        )}
      </Layout>
    </>
  );
};

export default Post;

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
    query: POST_QUERY,
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
      test: 0,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const apolloClient: any = initializeApollo();
  const res = await apolloClient.query({
    query: ALL_POSTS_WITH_SLUG_QUERY,
  });
  return {
    paths:
      res.data.posts.edges.map(({ node }) => {
        if (node) {
          return `/posts/${node.slug}`;
        }
      }) || [],
    fallback: true,
  };
};
