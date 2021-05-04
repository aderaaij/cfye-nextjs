import { gql } from '@apollo/client';

export const ALL_CATEGORIES = gql`
  {
    categories {
      edges {
        node {
          id
          databaseId
          description
          name
          slug
        }
      }
    }
  }
`;
