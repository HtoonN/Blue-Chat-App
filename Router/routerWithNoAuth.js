const express = require("express");
const routerWithNoAuth = express.Router();

const indexPage = require("../Controller/indexPage");
const userRegisterController = require("../Controller/UserRegisterController");
const userLoginController = require("../Controller/userLoginController");
const checkNoAuth = require("../HelperFunction/CheckNoAuth");

routerWithNoAuth.use(checkNoAuth);
routerWithNoAuth.get("/", indexPage);
routerWithNoAuth.post("/register", userRegisterController);
routerWithNoAuth.post("/login", userLoginController);

module.exports = routerWithNoAuth;
