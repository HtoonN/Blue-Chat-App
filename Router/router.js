const express = require("express");
const router = express.Router();
const indexPage = require("../Controller/indexPage");
const userRegisterController = require("../Controller/UserRegisterController");

router.get("/", indexPage);
router.post("/register", userRegisterController);

module.exports = router;
