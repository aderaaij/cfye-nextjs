import { gql } from '@apollo/client';

export const AuthorFields = gql`
  fragment AuthorFields on User {
    name
    firstName
    lastName
    slug
    avatar {
      url
    }
  }
`;
