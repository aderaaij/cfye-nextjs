import { gql } from '@apollo/client';
import { FEATURED_IMAGE_FIELDS } from './FeaturedImageFields';

export const POST_EXCERPT_FIELDS = gql`
  ${FEATURED_IMAGE_FIELDS}
  fragment PostExcerptFields on RootQueryToPostConnectionEdge {
    node {
      id
      title
      excerpt
      slug
      date
      isSticky
      tags {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
      categories {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
      featuredImageSettings {
        imageFit
        backgroundColor
      }
      featuredImage {
        ...FeaturedImageFields
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
`;
