import { gql } from '@apollo/client';

export const PostFields = gql`
  fragment PostFields on Post {
    title
    excerpt
    slug
    date
    featuredImageSettings {
      imageFit
      backgroundColor
    }
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
