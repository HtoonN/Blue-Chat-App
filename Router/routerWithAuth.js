const express = require("express");

const CreateGroupController = require("../Controller/CreateGroupController");
const SearchFriendsAndGroupsController = require("../Controller/SearchFriendsAndGroupsController");
const checkWithAuth = require("../HelperFunction/CheckAuth");
const addFriendController = require("../Controller/AddFriendController");
const AddGroupController = require("../Controller/AddGroupController");
const AcceptFriendController = require("../Controller/AcceptFriend");
const AcceptGroupController = require("../Controller/AcceptGroup");
const userLogOutController = require("../Controller/userLogOutController");
const updateUserDatas = require("../Controller/UpdateUserDatas");
const GetChatMessagesWithFriendController = require("../Controller/GetChatMessagesWithFriendController");
const deletePersonalMessageController = require("../Controller/DeletePersonalMessageController");
const getImageController = require("../Controller/GetImageController");
const getAllFriendsDatasController = require("../Controller/GetAllFrinedsDatasController");
const setMessageFriendController = require("../Controller/SetMessageFriendController");
const removeMessageFriendController = require("../Controller/RemoveMessageFriendController");
const blockUserController = require("../Controller/BlockUserController");
const unBlockUserController = require("../Controller/UnBlockUserController");
const unFriendController = require("../Controller/UnFriendController");
const getGroupDatas = require("../Controller/GetGroupDatas");
const addMemberByAdminController = require("../Controller/AddMemberByAdminController");

const routerWithAuth = express.Router();

routerWithAuth.use(checkWithAuth);

routerWithAuth.get(
  "/search_friends_and_groups",
  SearchFriendsAndGroupsController
);
routerWithAuth.get(
  "/get_image/:public_id/:version/:format/:type",
  getImageController
);
routerWithAuth.post("/create_group", CreateGroupController);
routerWithAuth.patch("/add_friend/:friId", addFriendController);
routerWithAuth.patch("/add_group/:groupId", AddGroupController);
routerWithAuth.patch("/accept_friend/:friendId", AcceptFriendController);
routerWithAuth.patch("/accept_group", AcceptGroupController);
routerWithAuth.delete("/logout", userLogOutController);
routerWithAuth.get(
  "/get_updated_user_datas_and_update_user_age",
  updateUserDatas
);
routerWithAuth.get(
  "/get_messages_with_friend/:friId",
  GetChatMessagesWithFriendController
);
routerWithAuth.delete(
  "/delete_personal_message/:msgId",
  deletePersonalMessageController
);
routerWithAuth.get("/get_all_friends_datas", getAllFriendsDatasController);
routerWithAuth.patch("/set_message_friend", setMessageFriendController);
routerWithAuth.patch("/remove_message_friend", removeMessageFriendController);
routerWithAuth.patch("/block_user", blockUserController);
routerWithAuth.patch("/unblock_user", unBlockUserController);
routerWithAuth.patch("/unfriend_user", unFriendController);
routerWithAuth.get("/get_group_data/:groupId/:flag", getGroupDatas);
routerWithAuth.patch(
  "/add_member_by_admin/:groupId/:memberId",
  addMemberByAdminController
);

module.exports = routerWithAuth;
