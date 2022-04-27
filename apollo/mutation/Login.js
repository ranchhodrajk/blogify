import { gql } from "@apollo/client";
export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      token
      created_at
    }
  }
`;