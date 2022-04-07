const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { readFileSync } = require("fs");
const path = require("path");

const applyDirectives = require("./directives");
const resolvers = require("./resolvers");
const SeriesAPI = require("./datasources/seriesAPI");

require("dotenv").config();

const commonTypeDefs = readFileSync(
  path.join("remote-gql/", "./schema.graphql"),
  {
    encoding: "utf-8"
  }
);
const appTypeDefs = readFileSync(path.join("src/", "./schema.graphql"), {
  encoding: "utf-8"
});
const typeDefs = gql(commonTypeDefs + appTypeDefs);

const server = new ApolloServer({
  schema: applyDirectives(buildSubgraphSchema({ typeDefs, resolvers })),
  dataSources: () => {
    return {
      seriesAPI: new SeriesAPI()
    };
  }
});

const port = process.env.PORT;
const subgraphName = "Series";

server
  .listen({ port })
  .then(({ url }) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
