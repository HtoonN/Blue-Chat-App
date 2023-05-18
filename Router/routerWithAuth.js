const express = require("express");

//controller
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
const removeFromGroupController = require("../Controller/RemoveFromGroupContoller");
const leaveGroupController = require("../Controller/LeaveGroupController");
const getGroupMessageController = require("../Controller/GetGroupMessageController");
const deleteGroupMessageController = require("../Controller/DeleteGroupMessageController");
const deleteChatController = require("../Controller/DeleteChatController");
const deleteGroupController = require("../Controller/DeleteGroupController");
const { upload } = require("../Utility/MulterUpload");
const updateGroupInfoController = require("../Controller/UpdateGroupInfoController");
const updateUserProfileController = require("../Controller/UpdageUserProfileController");
const changePasswordController = require("../Controller/ChangePasswordController");
const changeGroupOwnerController = require("../Controller/ChangeGroupOwnerController");
const changeThemeController = require("../Controller/ChangeThemeController");

const routerWithAuth = express.Router();

//middleware
routerWithAuth.use(checkWithAuth);

//Route
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
routerWithAuth.patch("/remove_from_group", removeFromGroupController);
routerWithAuth.delete("/leave_from_group/:groupId", leaveGroupController);
routerWithAuth.get(
  "/get_group_message/:groupId/:page",
  getGroupMessageController
);
routerWithAuth.patch("/delete_group_message", deleteGroupMessageController);
routerWithAuth.patch("/delete_chat", deleteChatController);
routerWithAuth.delete("/delete_group/:groupId", deleteGroupController);
routerWithAuth.patch(
  "/update_group_info/:groupId",
  upload.array("files"),
  updateGroupInfoController
);
routerWithAuth.patch(
  "/update_profile",
  upload.array("files"),
  updateUserProfileController
);
routerWithAuth.patch("/change_password", changePasswordController);
routerWithAuth.patch("/change_group_owner", changeGroupOwnerController);
routerWithAuth.patch("/change_theme/:theme", changeThemeController);

module.exports = routerWithAuth;
