import { gql } from "@apollo/client";
export const GETCATEGORIES = gql`
  query GetTags {
    getTags {
      name
    }
  }
`;
