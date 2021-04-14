import { gql } from '@apollo/client';

export const ARTISTS_QUERY = gql`
  query artists($first: Int!, $after: String) {
    artists(
      first: $first
      after: $after
      where: { orderby: { field: TITLE, order: ASC } }
    ) {
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        cursor
        node {
          id
          title
          slug
          featuredImage {
            node {
              sourceUrl(size: LARGE)
              srcSet(size: LARGE)
              id
            }
          }
        }
      }
    }
  }
`;
