import { gql } from '@apollo/client';
import { POST_EXCERPT_FIELDS } from '../fragments/PostExcerptFields';
export const FRONTPAGE_QUERY = gql`
  ${POST_EXCERPT_FIELDS}
  query frontpagePosts {
    settings: allSettings {
      generalSettingsDescription
      generalSettingsTitle
    }
    stickyPosts: posts(
      where: { onlySticky: true, orderby: { field: DATE, order: DESC } }
    ) {
      edges {
        cursor
        ...PostExcerptFields
      }
    }
    newWorkPosts: posts(
      first: 6
      where: { categoryId: 954, onlySticky: false }
    ) {
      edges {
        cursor
        ...PostExcerptFields
      }
    }
    interviewsPosts: posts(
      first: 7
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
      first: 7
      where: {
        categoryId: 13
        onlySticky: false
        orderby: { field: DATE, order: DESC }
      }
    ) {
      edges {
        cursor
        ...PostExcerptFields
      }
    }
  }
`;
