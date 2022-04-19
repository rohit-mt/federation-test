const { ApolloServer } = require("apollo-server");
const {
  ApolloGateway,
  IntrospectAndCompose,
  RemoteGraphQLDataSource
} = require("@apollo/gateway");
const { readFileSync } = require("fs");
const path = require("path");
const _ = require("lodash");

const deepMerge = require("./deepMerge");

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

function updateVariables(variables, data) {
  const regex = /^\{\{(.*?)\}\}$/gm;
  const modifiedVariables = JSON.parse(
    JSON.stringify(variables, (key, value) => {
      if (typeof value === "string") {
        const v = regex.exec(value);
        if (v) {
          return _.get(data, v[1]);
        }
      }
      return value;
    })
  );

  return modifiedVariables;
}

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest(options) {
    console.log("------------------------------");
    console.log(
      "🚀 ~ file: index.js ~ line 33 ~ AuthenticatedDataSource ~ willSendRequest ~ options",
      options.results
    );

    // options.context.rohit = 'xyz'

    const { variables } = options.request;

    if (variables) {
      options.request.variables = updateVariables(
        variables,
        options.context.response
      );
    }

    console.log(options.request.query);
    console.log("------------------------------");
  }

  didReceiveResponse(options) {
    const { response, context } = options;

    if (!context.response) {
      context.response = {};
    }

    // context.response.push(response.data);

    deepMerge(context.response, response.data);

    console.log(
      "🚀 ~ file: index.js ~ line 45 ~ AuthenticatedDataSource ~ didReceiveResponse ~ response.data",
      context.response
    );

    return response;
  }
}

const gateway = new ApolloGateway({
  supergraphSdl,
  buildService: ({ url }) => {
    return new AuthenticatedDataSource({ url });
  }
});

const server = new ApolloServer({
  context: ({ req }) => {
    return { to: "rohit" };
  },
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
