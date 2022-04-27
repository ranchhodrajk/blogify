import { gql } from "@apollo/client";
export const DELETE_COMMENT = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      title
      body
      username
      commentCount
      likeCount
      created_at
      comments {
        id
        body
        username
        created_at
      }
    }
  }
`;
