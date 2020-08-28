import mongoose from "mongoose";
import { Schema } from "mongoose";

const UsersDataSchema = new Schema({
  firstname: {
    type: String,
    unique: true,
    required: true,
  },
  secondname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

const UsersData = mongoose.model("users.data", UsersDataSchema, "users.data");

export default UsersData;

