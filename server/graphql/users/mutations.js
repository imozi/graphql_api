import { User } from "./model";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";
import { bcriptPwd } from "../../utils/bcrypt.js";

export const mutations = {
  singUp: async (parent, args) => {
    const { email, password } = args.user;

    const isUserVerification = await User.findOne({ email });
    const message = "Такой пользователь уже существует!";

    if (isUserVerification) {
      throw new AuthenticationError(message);
    }

    const user = await User.create({
      email,
      password: bcriptPwd.encrypt(password),
    });

    return user.save();
  },
  singIn: async (parent, args, ctx) => {
    const { email, password } = args.user;
    const message = "Неверное имя пользователя или пароль.";

    const userVerification = await User.findOne({ email });

    if (!userVerification) {
      throw new AuthenticationError(message);
    }

    const pwdVerification = bcriptPwd.decipher(
      password,
      userVerification.password
    );

    if (!pwdVerification) {
      throw new AuthenticationError(message);
    }

    const token = jwt.sign({ userId: userVerification.id }, process.env.SECRET);
    ctx.req.session.token = token;

    return userVerification;
  },
  singOut: async (parent, args, ctx) => {
    ctx.req.session.destroy();
  },
  updateUser: async (parent, args) => {
    const previousUser = await User.findById(args.id);
    const receivedUser = args.user;

    if (receivedUser.password) {
      receivedUser.password = bcriptPwd.encrypt(receivedUser.password);
    }

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
