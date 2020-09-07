import { app } from "../app";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "../graphql/typeDefs.graphql";
import { resolvers } from "../graphql/_resolvers";

const graphQl = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
});

graphQl.applyMiddleware({ app });

export default class Server {
  constructor(port = 3000) {
    this.port = port;
  }
  start() {
    app.listen({ port: `${this.port}` }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${this.port}${graphQl.graphqlPath}`
      )
    );
  }
}
