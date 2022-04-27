import { gql } from "@apollo/client";
export const REGISTER = gql`
mutation Register($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      id
      email
      username
      token
      created_at
    }
  }
`;