import { gql } from '@apollo/client';

export const ALL_ARTISTS_WITH_SLUG_QUERY = gql`
  {
    artists(first: 1000) {
      edges {
        node {
          slug
          modified
        }
      }
    }
  }
`;
