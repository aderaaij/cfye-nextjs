import { gql } from '@apollo/client';

export const ARTIST_QUERY = gql`
  query AristBySlug($id: ID!, $idType: ArtistIdType!) {
    artist(id: $id, idType: $idType) {
      slug
      id
      title
      featuredImage {
        node {
          id
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
      }
    }
  }
`;
