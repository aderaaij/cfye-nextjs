import { gql } from '@apollo/client';

export const POST_EXCERPT_FIELDS = gql`
  fragment PostExcerptFields on RootQueryToPostConnectionEdge {
    node {
      id
      title
      excerpt
      slug
      date
      isSticky
      tags {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
      categories {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
      featuredImageSettings {
        imageFit
        backgroundColor
      }
      featuredImage {
        node {
          sourceUrl(size: LARGE)
          thumbnail: sourceUrl(size: THUMBNAIL)
          srcSet(size: LARGE)
          id
        }
      }
      author {
        node {
          name
          firstName
          lastName
          avatar {
            url
          }
        }
      }
    }
  }
`;
