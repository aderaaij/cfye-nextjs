import { gql } from '@apollo/client';

export const ALL_TAGS = gql`
  {
    tags(where: { hideEmpty: true }, first: 10000) {
      edges {
        node {
          id
          databaseId
          description
          name
          slug
          count
        }
      }
    }
  }
`;
