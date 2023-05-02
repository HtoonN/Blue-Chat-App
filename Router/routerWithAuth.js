const express = require("express");

const CreateGroupController = require("../Controller/CreateGroupController");
const SearchFriendsAndGroupsController = require("../Controller/SearchFriendsAndGroupsController");
const checkWithAuth = require("../HelperFunction/CheckAuth");
const addFriendController = require("../Controller/AddFriendController");
const AddGroupController = require("../Controller/AddGroupController");
const AcceptFriendController = require("../Controller/AcceptFriend");
const AcceptGroupController = require("../Controller/AcceptGroup");
const indexPage = require("../Controller/indexPage");
const getImage = require("../Controller/GetImage");
const userLogOutController = require("../Controller/userLogOutController");

const routerWithAuth = express.Router();

routerWithAuth.use(checkWithAuth);

routerWithAuth.get(
  "/search_friends_and_groups",
  SearchFriendsAndGroupsController
);
routerWithAuth.post("/get_image", getImage);
routerWithAuth.post("/create_group", CreateGroupController);
routerWithAuth.get("/add_friend/:friId", addFriendController);
routerWithAuth.get("/add_group/:groupId", AddGroupController);
routerWithAuth.get("/accept_friend/:friendId", AcceptFriendController);
routerWithAuth.post("/accept_group", AcceptGroupController);
routerWithAuth.get("/logout", userLogOutController);

module.exports = routerWithAuth;
