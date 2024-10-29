import { ApolloClient, InMemoryCache } from "@apollo/client";

const token = localStorage.getItem("token");
const client = new ApolloClient({
  uri: "https://node-js-graphql.onrender.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default client;
