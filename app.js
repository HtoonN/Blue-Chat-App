const express = require("express");
const router = require("./Router/router");
const cors = require("cors");
const { corsConfig } = require("./Config/CorsConfig");

// const app = express();

// app.use("/", router);

// module.exports = app;

class App {
  constructor() {
    this.app = express();
    this.app.use(
      cors({
        ...corsConfig,
      })
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use("/", router);
  }

  startServer(PORT) {
    if (!PORT === true) {
      return "You have to give port number";
    }
    this.app.listen(PORT);
    return `Server Listen at PORT ${PORT}`;
  }
}

module.exports = App;
