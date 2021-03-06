const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { readFileSync } = require("fs");
const path = require("path");

const resolvers = require("./resolvers");
const UsersAPI = require("./datasources/usersAPI");

require("dotenv").config();

const headerTypeDefs = `extend schema
@link(url: "https://specs.apollo.dev/federation/v2.0",
      import: ["@key", "@external", "@shareable"])`;

const appTypeDefs = readFileSync(path.join("src/", "./schema.graphql"), {
  encoding: "utf-8"
});

const typeDefs = gql(headerTypeDefs + appTypeDefs);

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  dataSources: () => {
    return {
      usersAPI: new UsersAPI()
    };
  }
});

const port = process.env.PORT;
const subgraphName = "Users";

server
  .listen({ port })
  .then(({ url }) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
