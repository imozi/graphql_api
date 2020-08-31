import { app } from "../app";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "../graphql/typeDefs.graphql";
import { resolvers } from '../graphql/_resolvers';

const graphQl = new ApolloServer({ typeDefs, resolvers });
graphQl.applyMiddleware({ app, path: process.env.PATH_GQL });

export default class Server {
  constructor(port = 3000, sessionOptions) {
    this.port = port;
    this.session = sessionOptions;
  }
  start() {
    app.use(session(this.session));
    app.listen({ port: `${this.port}` }, () =>
      console.log(
        `🚀 Server started  on http://localhost:${this.port}`
      )
    );
  }
}
