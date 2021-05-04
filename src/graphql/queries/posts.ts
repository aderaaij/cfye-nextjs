import { gql } from '@apollo/client';

export const POSTS_QUERY = gql`
  query posts($first: Int!, $after: String, $name: String) {
    posts(
      first: $first
      after: $after
      where: { orderby: { field: DATE, order: DESC }, categoryName: $name }
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
          featuredImageSettings {
            imageFit
            backgroundColor
          }
          featuredImage {
            node {
              sourceUrl(size: LARGE)
              srcSet(size: LARGE)
              id
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
