import mongoose from "mongoose";

mongoose.Promise = require("bluebird");

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

export default class Mongoose {
  constructor(url) {
    this.url = url;
  }

  connect() {
    mongoose
      .connect(
        this.url ||
          `mongodb://${process.env.DATA_BASE_USER}:${process.env.DATA_BASE_PWD}@${process.env.DATA_BASE_URL}/${process.env.DATA_BASE_NAME}`,
        mongooseOptions
      )
      .then(() => {
        console.log(`🚀 Database connection succsseful!`);
      })
      .catch((error) => {
        console.error(`❌ Database connection error: ${error}`);
      });

    return mongoose.connection;
  }
}
