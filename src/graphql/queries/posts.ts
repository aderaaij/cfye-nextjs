import { gql } from '@apollo/client';
import { POST_EXCERPT_FIELDS } from '../fragments/PostExcerptFields';
export const POSTS_QUERY = gql`
  ${POST_EXCERPT_FIELDS}
  query categoryPosts(
    $first: Int!
    $after: String
    $categoryName: String
    $tagName: String
  ) {
    categoryPosts: posts(
      first: $first
      after: $after
      where: {
        orderby: { field: DATE, order: DESC }
        categoryName: $categoryName
        tag: $tagName
      }
    ) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      edges {
        cursor
        ...PostExcerptFields
      }
    }
  }
`;
