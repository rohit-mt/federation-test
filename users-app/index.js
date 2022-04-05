const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { readFileSync } = require("fs");

const typeDefs = gql(readFileSync("./schema.graphql", { encoding: "utf-8" }));
const resolvers = require("./resolvers");
const UsersAPI = require("./datasources/usersAPI");

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  dataSources: () => {
    return {
      usersAPI: new UsersAPI()
    };
  }
});

const port = 5001;
const subgraphName = "Users";

server
  .listen({ port })
  .then(({ url }) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
