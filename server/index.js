import "dotenv/config";
import Server from "./server";
import Mongoose from "./mongoose";

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const server = new Server(process.env.PORT);
const mongoose = new Mongoose(
  process.env.DATA_BASE_URL,
  process.env.DATA_BASE_NAME,
  process.env.DATA_BASE_USER,
  process.env.DATA_BASE_PWD,
  mongooseOptions
);

mongoose.connect().once("open", () => server.start());
