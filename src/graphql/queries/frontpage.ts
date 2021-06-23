import { gql } from '@apollo/client';
import { POST_EXCERPT_FIELDS } from '../fragments/PostExcerptFields';
export const FRONTPAGE_QUERY = gql`
  ${POST_EXCERPT_FIELDS}
  query frontpagePosts($first: Int!, $after: String) {
    settings: allSettings {
      generalSettingsDescription
      generalSettingsTitle
    }
    stickyPosts: posts(
      first: $first
      after: $after
      where: { onlySticky: true, orderby: { field: DATE, order: DESC } }
    ) {
      edges {
        cursor
        ...PostExcerptFields
      }
    }
    newWorkPosts: posts(
      first: 4
      where: { categoryId: 954, onlySticky: false }
    ) {
      edges {
        cursor
        ...PostExcerptFields
      }
    }
    interviewsPosts: posts(
      first: 5
      where: { categoryId: 11, onlySticky: false }
    ) {
      edges {
        cursor
        ...PostExcerptFields
      }
    }
    cfyeXPosts: posts(first: 1, where: { categoryId: 17, onlySticky: true }) {
      edges {
        cursor
        ...PostExcerptFields
      }
    }
    featuresPosts: posts(
      first: 5
      where: { categoryId: 13, onlySticky: false }
    ) {
      edges {
        cursor
        ...PostExcerptFields
      }
    }
  }
`;
