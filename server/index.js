import "dotenv/config";
import Server from "./server";
import Mongoose from "./mongoose";

const server = new Server(process.env.PORT);
const mongoose = new Mongoose();

mongoose.connect().once("open", () => server.start());
