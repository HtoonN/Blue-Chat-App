const express = require("express");
const cors = require("cors");
const { corsConfig } = require("./Config/CorsConfig");
const routerWithNoAuth = require("./Router/routerWithNoAuth");
const routerWithAuth = require("./Router/routerWithAuth");

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

    this.app.use("/api/v1/user/", routerWithNoAuth);
    this.app.use("/api/v1/user/account/", routerWithAuth);
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
