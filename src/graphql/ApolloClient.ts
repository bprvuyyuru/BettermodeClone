import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.bettermode.com", // The API endpoint
});

const authLink = setContext((_, { headers }) => {
  // Retrieve the token from sessionStorage
  const token = sessionStorage.getItem("accessToken");
  const communityToken = sessionStorage.getItem("communityToken");
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token ? token : communityToken}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
