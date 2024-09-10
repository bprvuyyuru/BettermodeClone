import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($usernameOrEmail: String!, $password: String!) {
    loginNetwork(
      input: { usernameOrEmail: $usernameOrEmail, password: $password }
    ) {
      accessToken
      role {
        name
        scopes
      }
      member {
        id
        name
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($limit: Int!, $offset: Int!) {
    posts(limit: $limit, offset: $offset) {
      nodes {
        id
        title
        owner {
          member {
            name
          }
        }
        space {
          name
        }
        publishedAt
        reactions {
          count
          reaction
        }
      }
      totalCount
    }
  }
`;

export const GET_POST_DETAILS = gql`
  query GetPostDetails($id: ID!) {
    post(id: $id) {
      title
      textContent
      owner {
        member {
          name
        }
      }
      space {
        name
      }
      publishedAt
      reactions {
        count
        reaction
      }
    }
  }
`;

export const ADD_REACTION_MUTATION = gql`
  mutation AddReaction($reaction: String!, $postId: ID!) {
    addReaction(input: { reaction: $reaction }, postId: $postId) {
      status
    }
  }
`;

export const REMOVE_REACTION_MUTATION = gql`
  mutation RemoveReaction($reaction: String!, $postId: ID!) {
    removeReaction(reaction: $reaction, postId: $postId) {
      status
    }
  }
`;
