import { gql } from "@apollo/client";
export const GETPOSTS = gql`
  query GetPosts {
    getPosts {
      id
      title
      body
      username
      created_at
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
      likeCount
      commentCount
      tags {
        name
      }
    }
  }
`;
