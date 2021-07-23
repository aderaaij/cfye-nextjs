import { gql } from '@apollo/client';

export const ALL_ARTISTS_WITH_SLUG_QUERY = gql`
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
