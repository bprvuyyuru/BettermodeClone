import { gql } from "@apollo/client";

export const GET_COMMUNITY_TOKEN = gql`
  query GetCommunityToken($networkDomain: String!) {
    tokens(networkDomain: $networkDomain) {
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
