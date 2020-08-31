import { User } from "./model";
import bcrypt from "bcryptjs";

export const mutations = {
  addUser: async (parent, data) => {
    const salt = bcrypt.genSaltSync(10);

    const { email, password } = data.user;

    const user = await User.create({
      email,
      password: bcrypt.hashSync(password, salt),
    });

    return user.save();
  },
  updateUser: async (parent, data) => {
    const previousUser = await User.findById(data.id);
    const receivedUser = data.user;

    return await User.findByIdAndUpdate(
      previousUser.id,
      {
        $set: {
          ...previousUser._doc,
          ...receivedUser,
        },
      },
      { new: true }
    );
  },
  removeUser: async (parent, { id }) => await User.findByIdAndDelete(id),
};
