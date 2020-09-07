import passport from "passport";
import passportJwt from "passport-jwt";
import { AuthenticationError } from "apollo-server-express";

import { User } from "../graphql/users/model";

const { Strategy } = passportJwt;

var sessionExtractor = function (req) {
  var token = null;
  if (req && req.session.token) {
    token = req.session.token;
  }
  return token;
};

const options = {
  jwtFromRequest: sessionExtractor,
  secretOrKey: process.env.SECRET,
};


export const StrategyJwt = new Strategy(options, async (payload, done) => {
  const id = await User.findById(payload.userId).select("id");
  return id ? done(null, id) : done(null, false);
});


export const authentication = (req, res, strategy) =>
    new Promise((resolve, reject) => {
      passport.authenticate(strategy, { session: false }, (error, id) => {
        const message = "Войте пожалуйста в систему!";
        return id ? resolve(id) : reject(new AuthenticationError(message));
      })(req, res, strategy);
  });

