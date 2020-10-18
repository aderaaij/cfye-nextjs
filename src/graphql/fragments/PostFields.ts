import { gql } from '@apollo/client';

export const PostFields = /* GraphQL */ gql`
  fragment PostFields on Post {
    title
    excerpt
    slug
    date
    featuredImage {
      node {
        sourceUrl
        id
        srcSet
        sizes
        mediaDetails {
          sizes {
            sourceUrl
          }
        }
      }
    }
    author {
      node {
        ...AuthorFields
      }
    }
    categories {
      edges {
        node {
          name
        }
      }
    }
    tags {
      edges {
        node {
          name
        }
      }
    }
  }
`;
