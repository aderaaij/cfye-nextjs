import { gql } from '@apollo/client';
import { AuthorFields } from '../fragments/AuthorFields';
import { PostFields } from '../fragments/PostFields';
import { ArtistSummary } from '../fragments/ArtistSummary';

export const POST_QUERY = gql`
  query PostBySlug($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      ...PostFields
      blocks {
        name
        order
        saveContent
      }
      postSettingsField {
        artistPost {
          ... on Artist {
            ...ArtistSummary
          }
        }
      }
      content
    }
    posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
  ${PostFields}
  ${AuthorFields}
  ${ArtistSummary}
`;
