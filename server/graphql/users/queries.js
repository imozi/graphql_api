import { User } from "./model";
import { authentication } from "../../utils/strategyPassport";

export const queries = {
  Users: async (parent, data, ctx) => {
    const { id } = await authentication(ctx.req, ctx.res, ["jwt"]);
    const message = "Войте пожалуйста в систему!";
    if (!id) {
      throw new AuthenticationError(message);
    }
    return await User.find({});
  },
  User: async (parent, { id }) => await User.findById(id),
};
