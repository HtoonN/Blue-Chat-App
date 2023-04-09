const express = require("express");

const CreateGroupController = require("../Controller/CreateGroupController");
const SearchFriendsAndGroupsController = require("../Controller/SearchFriendsAndGroupsController");
const checkWithAuth = require("../HelperFunction/CheckAuth");
const addFriendController = require("../Controller/AddFriendController");

const routerWithAuth = express.Router();

routerWithAuth.use(checkWithAuth);

routerWithAuth.get(
  "/search_friends_and_groups",
  SearchFriendsAndGroupsController
);
routerWithAuth.post("/create_group", CreateGroupController);
routerWithAuth.get("/add_friend/:friId", addFriendController);

module.exports = routerWithAuth;
