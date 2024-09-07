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
