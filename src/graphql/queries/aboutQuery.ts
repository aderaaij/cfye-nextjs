import { gql } from '@apollo/client';
import { FEATURED_IMAGE_FIELDS } from '../fragments/FeaturedImageFields';

export const ABOUT_QUERY = gql`
  ${FEATURED_IMAGE_FIELDS}
  query AboutPage {
    page(id: "about", idType: URI) {
      id
      title
      blocks {
        dynamicContent
        originalContent
        saveContent
      }
      content
      featuredImage {
        ...FeaturedImageFields
      }
    }
  }
`;
