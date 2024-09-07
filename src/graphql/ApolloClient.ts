import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.bettermode.com", // The API endpoint
});

const authLink = setContext((_, { headers }) => {
  // Retrieve the token from sessionStorage
  const token = sessionStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token
        ? `Bearer ${token}`
        : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkdVRVNUX3pUaVpEclRQNlUzajludiIsIm5ldHdvcmtJZCI6IjNiMW40b3FpbWYiLCJuZXR3b3JrRG9tYWluIjoiYmFzaWMtM2Z0b3M5aHMuYmV0dGVybW9kZS5pbyIsInRva2VuVHlwZSI6IkdVRVNUIiwiZW50aXR5SWQiOm51bGwsInBlcm1pc3Npb25Db250ZXh0IjpudWxsLCJwZXJtaXNzaW9ucyI6bnVsbCwiaWF0IjoxNzI1NzI5Nzg4LCJleHAiOjE3MjgzMjE3ODh9.GjYRacI78ReJAVqlDlmqs3EWfjdgMj0RLujOuY2Cf_A",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
