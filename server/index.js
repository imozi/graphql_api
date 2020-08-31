import "dotenv/config";
import Server from "./server";
import Mongoose from "./mongoose";

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const sessionOptions = {
  key: "token",
  secret: process.env.SECRET,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: new Date(Date.now() + 60 * 60 * 1000),
  },
};

const server = new Server(process.env.PORT, sessionOptions);
const mongoose = new Mongoose(
  process.env.DATA_BASE_URL,
  process.env.DATA_BASE_NAME,
  process.env.DATA_BASE_USER,
  process.env.DATA_BASE_PWD,
  mongooseOptions
);

mongoose.connect().once("open", () => server.start());
