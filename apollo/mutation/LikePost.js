import { gql } from "@apollo/client";
export const LIKEPOST = gql`
mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      username
      title
      body
      created_at
      likeCount
      commentCount
      tags {
        name
      }
      comments {
        id
        body
        username
        created_at
      }
      likes {
        id
        username
        created_at
      }
    }
  }
`;