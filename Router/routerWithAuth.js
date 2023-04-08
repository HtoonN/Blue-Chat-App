const express = require("express");

const CreateGroupController = require("../Controller/CreateGroupController");
const SearchFriendsAndGroupsController = require("../Controller/SearchFriendsAndGroupsController");
const checkWithAuth = require("../HelperFunction/CheckAuth");

const routerWithAuth = express.Router();

routerWithAuth.use(checkWithAuth);

routerWithAuth.get(
  "/search_friends_and_groups/:name",
  SearchFriendsAndGroupsController
);
routerWithAuth.post("/create_group", CreateGroupController);

module.exports = routerWithAuth;
