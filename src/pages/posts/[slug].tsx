import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import Container from '@/components/Container';
import PostBody from '@/components/PostBody';
import MoreStories from '@/components/MoreStories';
import Header from '@/components/Header';
import PostHeader from '@/components/PostHeader';
import SectionSeparator from '@/components/SectionSeparator';
import Layout from '@/components/Layout';
import PostTitle from '@/components/PostTitle';
import Tags from '@/components/Tags';
import { getAllPostsWithSlug } from '@/lib/api';
import { initializeApollo } from '@/lib/apolloClient';
import {
  CategoryToPostConnection,
  Post as GeneratedPostType,
  PostIdType,
  PostStatusEnum,
  PostFormatIdType,
} from 'types';
import { POST_QUERY } from '@/graphql/queries/POST_QUERY';
interface Props {
  post: GeneratedPostType;
  posts?: CategoryToPostConnection;
  preview: boolean;
}

const Post: React.FC<Props> = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(POST_QUERY(), {
    variables: {
      id: router.query.slug,
      idType: PostIdType.Slug,
    },
  });

  if (!data) {
    return <ErrorPage statusCode={501} />;
  }

  const { post, posts } = data;
  const morePosts = [...posts.edges];
  if (morePosts.length > 2) morePosts.pop();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (error) return <ErrorPage statusCode={501} />;
  if (loading) return <div>Loading</div>;

  return (
    <>
      <Layout preview={false}>
        <Container>
          <Header />
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article>
                <Head>
                  <title>
                    {post.title} | Next.js Blog Example with{' '}
                    {process.env.CMS_NAME}
                  </title>
                  <meta
                    property="og:image"
                    content={
                      post.featuredImage?.node?.mediaDetails?.sizes[1].sourceUrl
                    }
                  />
                </Head>
                <PostHeader
                  title={post.title}
                  coverImage={post.featuredImage?.node}
                  date={post.date}
                  author={post.author?.node}
                  categories={post.categories}
                />
                <PostBody content={post.content} />
                <footer>
                  {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
                </footer>
              </article>

              <SectionSeparator />
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </>
          )}
        </Container>
      </Layout>
    </>
  );
};

export default Post;

export const getStaticProps = async ({
  params,
  preview = false,
  previewData,
}): Promise<any> => {
  const apolloClient = initializeApollo();
  const postPreview: GeneratedPostType = preview && previewData?.post;
  const isId = Number.isInteger(Number(params.slug));
  const isSamePost = isId
    ? Number(params.slug) === Number(postPreview.id)
    : params.slug === postPreview.slug;
  const isDraft =
    isSamePost && postPreview?.status === PostStatusEnum.Draft.toLowerCase();
  const isRevision =
    isSamePost && postPreview?.status === PostStatusEnum.Publish.toLowerCase();

  await apolloClient.query({
    query: POST_QUERY(isRevision),
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

interface StaticPaths {
  paths: (string | undefined)[] | [];
  fallback: boolean;
}

export async function getStaticPaths(): Promise<StaticPaths> {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths:
      allPosts.edges.map(({ node }) => {
        if (node) {
          return `/posts/${node.slug}`;
        }
      }) || [],
    fallback: true,
  };
}
