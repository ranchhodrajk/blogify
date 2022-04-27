import { gql } from "@apollo/client";
export const GET_TAG_POST = gql`
  query GetTagPosts($tag: String!) {
    getTagPosts(tag: $tag) {
      id
      body
      username
      created_at
      title
      tags {
        name
      }
    }
  }
`;
