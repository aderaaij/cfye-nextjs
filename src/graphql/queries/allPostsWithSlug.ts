import { gql } from '@apollo/client';

export const allPostsWithSlug = /* GraphQL */ gql`
  {
    posts(first: 10000) {
      edges {
        node {
          slug
        }
      }
    }
  }
`;
