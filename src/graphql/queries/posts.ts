import { gql } from '@apollo/client';

export const POSTS_QUERY = gql`
  query posts($first: Int!, $after: String) {
    posts(
      first: $first
      after: $after
      where: { orderby: { field: DATE, order: DESC } }
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
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
              srcSet
              id
              mediaDetails {
                sizes {
                  sourceUrl
                }
              }
            }
          }
          author {
            node {
              name
              firstName
              lastName
              avatar {
                url
              }
            }
          }
        }
      }
    }
  }
`;
