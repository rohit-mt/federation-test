const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { readFileSync } = require("fs");

const resolvers = require("./resolvers");
const SeriesAPI = require("./datasources/seriesAPI");

const commonTypeDefs = readFileSync("./common.graphql", { encoding: "utf-8" });
const appTypeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });
const typeDefs = gql(commonTypeDefs + appTypeDefs);

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  dataSources: () => {
    return {
      seriesAPI: new SeriesAPI()
    };
  }
});

const port = 5002;
const subgraphName = "Series";

server
  .listen({ port })
  .then(({ url }) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
