import { gql } from '@apollo/client';

export const Revisions = gql`
  fragment Revisions on Post {
    revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
      edges {
        node {
          title
          excerpt
          content
          author {
            node {
              ...AuthorFields
            }
          }
        }
      }
    }
  }
`;
