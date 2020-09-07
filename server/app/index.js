import express from "express";
import session from "express-session";
import sessionStore from "connect-mongo";
import passport from "passport";
import cors from "cors";
import ms from "ms";
import { StrategyJwt } from "../utils/strategyPassport";

export const app = express();
const store = sessionStore(session);
const sessionOptions = {
  name: "LOGIN_INFO",
  secret: process.env.SECRET,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  store: new store({
    collection: "sessions",
    url: `mongodb://${process.env.DATA_BASE_USER}:${process.env.DATA_BASE_PWD}@${process.env.DATA_BASE_URL}/${process.env.DATA_BASE_NAME}`,
  }),
  cookie: {
    httpOnly: true,
    maxAge: ms("1d"),
    sameSite: true,
    secure: false,
  },
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session(sessionOptions));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
passport.use(StrategyJwt);

passport.serializeUser((user, done) => {
  console.log(
    "Inside serialise cb. User id is stored to the session file store here"
  );
  done(null, user.id); // store the user.id into session
});

passport.deserializeUser((id, done) => {
  console.log("Inside deserializeUser callback");
  console.log(`The user id passport saved in the session file store is: ${id}`);
  const user = User.findById(id).select("id") === id ? user : false;
  done(null, user);
});
