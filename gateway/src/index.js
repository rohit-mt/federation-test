const { ApolloServer } = require("apollo-server");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { readFileSync } = require("fs");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env")
});

let supergraphSdl;

if (process.env.NODE_ENV === "development") {
  console.log("Creating in-memory supergraph for local development");
  supergraphSdl = new IntrospectAndCompose({
    subgraphs: [
      { name: "users-app", url: process.env.USERS_APP_URL },
      { name: "series-app", url: process.env.SERIES_APP_URL }
    ]
  });
} else {
  const superGraphPath = path.join(__dirname, "../supergraph.graphql");
  supergraphSdl = readFileSync(superGraphPath).toString();
}

const gateway = new ApolloGateway({
  supergraphSdl
});

const server = new ApolloServer({
  gateway
});

const port = process.env.GATEWAY_PORT;

server
  .listen({ port })
  .then(({ url }) => {
    console.log(`🚀 Gateway ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
