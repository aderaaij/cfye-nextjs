import { gql } from '@apollo/client';

export const TaxonomyFields = gql`
  fragment TaxonomyFields on RootQueryToTagConnection {
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
`;
