import { User } from "./model";

export const queries = {
  Users: async () => await User.find({}),
  User: async (parent, { id }) => await User.findById(id),
};
