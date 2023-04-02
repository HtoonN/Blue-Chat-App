const mongoose = require("mongoose");

class ConnectDatabase {
  constructor() {
    mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("DB is connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = ConnectDatabase;
