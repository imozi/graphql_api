import mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

export default class Mongoose {
  constructor(url, name, user, pwd, options) {
    this.url = url;
    this.name = name;
    this.user = user;
    this.pwd = pwd;
    this.options = options;
  }

  connect() {
    mongoose.connect(`mongodb://${this.user}:${this.pwd}@${this.url}/${this.name}`, this.options)
    .then(() => {
      console.log(`🚀 Database connection succsseful!`);
    })
    .catch((error) => {
            console.error(`❌ Database connection error: ${error}`);
    })

    return mongoose.connection;
  }
}
