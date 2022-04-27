import { gql } from "@apollo/client";
export const COMMENT_POST = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      title
      body
      username
      created_at
      likeCount
      commentCount
      tags {
        name
      }
    }
  }
`;
