import { gql } from "@apollo/client";
export const GET_USER_POST = gql`
  query GetUserPost {
    getUserPost {
      id
      body
      username
      created_at
      likeCount
      commentCount
      title
      likes {
        id
        username
        created_at
      }
      tags {
        name
      }
    }
  }
`;
