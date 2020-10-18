import { gql } from '@apollo/client';

export const AuthorFields = /* GraphQL */ gql`
  fragment AuthorFields on User {
    name
    firstName
    lastName
    avatar {
      url
    }
  }
`;
