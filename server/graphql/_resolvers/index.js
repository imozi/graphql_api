import { Query } from "./query";
import { Mutation } from "./mutation";

export const resolvers = {
  Query,
  Mutation,
};




// import { gql } from "apollo-server-express";

// import { User } from "../models";
// import { UserData } from "../models";

// export const typeDefs = gql`



// `;

// export const resolvers = {
//   Query: {
//     Users: async () => await User.find({}),
//     User: async (parent, { id }) => await User.findById(id),
//   },

//   User: {
//     data: async ({ data }) => await UserData.findById(data),
//   },

//   Mutation: {
//     addUser: async (parent, data) => {
//       const salt = bcrypt.genSaltSync(10);

//       const { email, password } = data.user;

//       const user = await User.create({
//         email,
//         password: bcrypt.hashSync(password, salt),
//       });

//       return user.save();
//     },
//     updateUser: async (parent, data) => {
//       const previousUser = await User.findById(data.id);
//       const receivedUser = data.user;

//       return await User.findByIdAndUpdate(
//         previousUser.id,
//         {
//           $set: {
//             ...previousUser._doc,
//             ...receivedUser,
//           },
//         },
//         { new: true }
//       );
//     },
//     removeUser: async (parent, { id }) => await User.findByIdAndDelete(id),
//   },
// };
