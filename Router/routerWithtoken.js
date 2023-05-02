const express = require("express");
const videoRequestController = require("../Controller/VideoRequestController");
const { checkToken } = require("../HelperFunction/CheckToken");
const routerWithToken = express.Router();

routerWithToken.use(checkToken);

routerWithToken.get("/video", videoRequestController);

module.exports = routerWithToken;
