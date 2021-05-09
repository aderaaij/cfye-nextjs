import { gql } from '@apollo/client';
import { POST_EXCERPT_FIELDS } from '../fragments/PostExcerptFields';
export const FRONTPAGE_QUERY = gql`
  ${POST_EXCERPT_FIELDS}
  query frontpagePosts($first: Int!, $after: String) {
    featuredPosts: posts(
      first: $first
      after: $after
      where: { onlySticky: true, orderby: { field: DATE, order: DESC } }
    ) {
      edges {
        cursor
        ...PostExcerptFields
      }
    }
    newWorkPosts: posts(first: 4, where: { categoryId: 954 }) {
      edges {
        cursor
        ...PostExcerptFields
      }
    }
  }
`;
