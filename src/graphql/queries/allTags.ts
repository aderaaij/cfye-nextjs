import { gql } from '@apollo/client';

export const ALL_TAGS = gql`
  {
    tags(first: 10000) {
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
