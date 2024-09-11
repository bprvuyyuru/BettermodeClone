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
