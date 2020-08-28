import { gql } from "apollo-server-express";
import { Users } from "../models";
import { UsersData } from "../models";

export const typeDefs = gql`
  type Users {
    id: ID
    email: String
    password: String
    data: UsersData
  }

  type UsersData {
    id: ID
    firstname: String
    secondname: String
    lastname: String
  }

  type Query {
    Users: [Users!]!
    UsersData: [UsersData!]!
  }
`;

export const resolvers = {
  Query: {
    Users: async () => await Users.find({}),
  },

  Users: {
    data: async ({ data }) => await UsersData.findById(data),
  },
};
