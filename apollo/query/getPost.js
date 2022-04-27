import { gql } from "@apollo/client";
export const GETPOST = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      title
      body
      username
      created_at
      likes {
        id
        username
      }
      comments {
        id
        body
        username
      }
      tags {
        name
      }
      likeCount
      commentCount
    }
  }
`;
