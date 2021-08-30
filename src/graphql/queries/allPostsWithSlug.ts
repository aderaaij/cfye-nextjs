import { gql } from '@apollo/client';

export const ALL_POSTS_WITH_SLUG_QUERY = gql`
  {
    posts(first: 10000) {
      edges {
        node {
          slug
          modified
        }
      }
    }
  }
`;
