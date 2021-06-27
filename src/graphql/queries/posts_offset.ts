import { gql } from '@apollo/client';
import { POST_EXCERPT_FIELDS } from '../fragments/PostExcerptFields';
export const POSTS_QUERY_OFFSET = gql`
  ${POST_EXCERPT_FIELDS}
  query categoryPosts(
    $categoryName: String
    $tagName: String
    $id: ID!
    $offset: Int!
    $size: Int!
  ) {
    categoryPosts: posts(
      where: {
        offsetPagination: { offset: $offset, size: $size }
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
    categoryDetails: category(id: $id, idType: SLUG) {
      id
      description
      name
    }
    tagDetails: tag(id: $id, idType: SLUG) {
      id
      description
      name
    }
  }
`;
