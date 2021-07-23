import { gql } from '@apollo/client';
import { POST_EXCERPT_FIELDS } from '../fragments/PostExcerptFields';
import { FEATURED_IMAGE_FIELDS } from '../fragments/FeaturedImageFields';
export const ARTIST_QUERY = gql`
  query ArtistBySlug($id: ID!, $idType: ArtistIdType!) {
    artist(id: $id, idType: $idType) {
      slug
      id
      title
      featuredImage {
        node {
          id
          thumbnail: sourceUrl(size: THUMBNAIL)
          sourceUrl
        }
      }
      artistInformation {
        artistDescription
        sltWebsite
        sltYoutubeid
        sltTwitterid
        sltInstagram
        flickrUsername
        relatedArticles {
          ... on Post {
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
      }
    }
  }
  ${FEATURED_IMAGE_FIELDS}
`;
