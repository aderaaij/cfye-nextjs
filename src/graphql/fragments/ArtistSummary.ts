import { gql } from '@apollo/client';

export const ArtistSummary = gql`
  fragment ArtistSummary on Artist {
    id
    title
    featuredImage {
      node {
        id
        srcSet(size: LARGE)
        sourceUrl(size: LARGE)
        thumbnail: sourceUrl(size: THUMBNAIL)
      }
    }
    artistInformation {
      artistDescription
      fieldGroupName
      flickrUsername
      sltInstagram
      sltTwitterid
      sltWebsite
      sltYoutubeid
    }
  }
`;
