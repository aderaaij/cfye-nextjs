import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
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
import {
  CategoryToPostConnection,
  Post as GeneratedPostType,
  PostIdType,
} from 'types';
import { gql, useQuery } from '@apollo/client';
import { initializeApollo } from '@/lib/apolloClient';
import { PostFields } from '@/graphql/fragments/PostFields';
import { AuthorFields } from '@/graphql/fragments/AuthorFields';
interface Props {
  post: GeneratedPostType;
  posts?: CategoryToPostConnection;
  preview: boolean;
}
const isRevision = false;
export const POST_QUERY = gql`
query PostBySlug($id: ID!, $idType: PostIdType!) {
  post(id: $id, idType: $idType) {
    ...PostFields
    content
    ${
      // Only some of the fields of a revision are considered as there are some inconsistencies
      isRevision
        ? `
    revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
      edges {
        node {
          title
          excerpt
          content
          author {
            node {
              ...AuthorFields
            }
          }
        }
      }
    }
    `
        : ''
    }
  }
  posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
    nodes {
      ...PostFields
    }
    edges {
      node {
        ...PostFields
      }
    }
  }
}
${PostFields}${AuthorFields}
`;

const Post: React.FC<Props> = () => {
  const router = useRouter();
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    POST_QUERY,
    {
      variables: {
        id: router.query.slug,
        idType: PostIdType.Slug,
      },
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  const { post, posts } = data;

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
              {posts.nodes.length > 0 && <MoreStories posts={posts.edges} />}
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
  console.log(params, preview, previewData);
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: POST_QUERY,
    variables: {
      id: params.slug,
      idType: PostIdType.Slug,
    },
  });

  return {
    props: {
      preview: false,
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
