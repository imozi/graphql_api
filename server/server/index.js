import { app } from "../app";
import { ApolloServer} from "apollo-server-express";
import { typeDefs, resolvers} from "../graphql";

const graphQl = new ApolloServer({ typeDefs, resolvers });
graphQl.applyMiddleware({ app, path: process.env.PATH_GQL });

export default class Server {
  constructor(port = 3000) {
    this.port = port;
  }
  start() {
    app.listen({ port: `${this.port}` }, () => console.log(`🚀 Server started  on http://localhost:${this.port}`));
  }
}
