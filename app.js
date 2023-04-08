const express = require("express");
const cors = require("cors");
const { corsConfig } = require("./Config/CorsConfig");
const routerWithNoAuth = require("./Router/routerWithNoAuth");
const routerWithAuth = require("./Router/routerWithAuth");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./HelperFunction/VerifyJWT");

// const app = express();

// app.use("/", router);

// module.exports = app;

class App {
  constructor() {
    this.app = express();
    this.server = require("http").createServer(this.app);
    this.app.use(
      cors({
        ...corsConfig,
      })
    );

    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(verifyJWT);

    this.app.use("/api/v1/normal/user", routerWithNoAuth);
    this.app.use("/api/v1/account/user", routerWithAuth);
  }

  getExpressServer() {
    return this.server;
  }

  startServer(PORT) {
    if (!PORT === true) {
      return "You have to give port number";
    }
    this.server.listen(PORT, () => {
      console.log(`Server Listen at PORT ${PORT}`);
    });
  }
}

module.exports = App;
