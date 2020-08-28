import mongoose from "mongoose";
import { Schema } from "mongoose";

const UsersSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  data: {
    ref: "users.data",
    type: Schema.Types.ObjectId,
  },
});

const Users = mongoose.model("users", UsersSchema, "users");

export default Users;
