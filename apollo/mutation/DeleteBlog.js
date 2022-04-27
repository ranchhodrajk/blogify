import { gql } from "@apollo/client";
export const DELETE_BLOG = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
