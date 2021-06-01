import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { useQuery } from '@apollo/client';
import PostBody from '@/components/PostBody';
import PostHeader from '@/components/PostHeader';
import Layout from '@/components/Layout';
import PostTitle from '@/components/PostTitle';
import { initializeApollo } from '@/lib/apolloClient';
import {
  CategoryToPostConnection,
  Post as GeneratedPostType,
  PostIdType,
  PostStatusEnum,
  PostFormatIdType,
} from 'types';
import { POST_QUERY } from '@/graphql/queries/postBySlug';
import { ALL_POSTS_WITH_SLUG_QUERY } from '@/graphql/queries/allPostsWithSlug';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import Tags from '@/components/Tags';
import styles from './Post.module.scss';
import { motion } from 'framer-motion';
import MetaPage from '@/components/MetaPage';

interface Props {
  post: GeneratedPostType;
  posts?: CategoryToPostConnection;
  preview: boolean;
}

const Post: React.FC<Props> = () => {
  const router = useRouter();
  const { error, data } = useQuery(POST_QUERY, {
    variables: {
      id: router.query.slug,
      idType: PostIdType.Slug,
    },
  });

  if (!data) {
    return <ErrorPage statusCode={501} />;
  }

  const { post } = data;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  if (error) return <ErrorPage statusCode={501} />;

  return (
    <>
      <Layout preview={false}>
        <MetaPage
          title={post.title}
          description={post.excerpt}
          image={post.featuredImage?.node?.mediaDetails?.sizes[1].sourceUrl}
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
              <footer>
                {/* {post.postSettingsField?.artistPost?.title} */}
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
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
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const apolloClient: any = initializeApollo();
  const res = await apolloClient.query({
    query: ALL_POSTS_WITH_SLUG_QUERY,
  });
  // const edges: RootQueryToPostConnection['edges'] = apolloClient.cache.extract()
  //   .ROOT_QUERY.posts.edges;
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
