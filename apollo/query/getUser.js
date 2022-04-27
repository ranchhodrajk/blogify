import { gql } from "@apollo/client";
export const GETUSER = gql`
  query GetUser {
    getUser {
      id
      username
      created_at
      email
    }
  }
`;
