import { gql } from '@apollo/client';
export const FEATURED_IMAGE_FIELDS = gql`
  fragment FeaturedImageFields on NodeWithFeaturedImageToMediaItemConnectionEdge {
    node {
      sourceUrl(size: LARGE)
      thumbnail: sourceUrl(size: THUMBNAIL)
      srcSet(size: LARGE)
      id
    }
  }
`;
