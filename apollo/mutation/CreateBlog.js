import { gql } from "@apollo/client";
export const CREATE_BLOG = gql`
  mutation CreatePost($title: String!, $body: String!, $tags: String!) {
    createPost(title: $title, body: $body, tags: $tags) {
      id
      title
      body
      username
      created_at
      tags {
        name
      }
    }
  }
`;
