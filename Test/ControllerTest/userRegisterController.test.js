const userRegisterController = require("../../Controller/UserRegisterController");

describe("userRegister Controller Test", () => {
  it("it should be true", async () => {
    req = {
      body: {
        data: {
          username: "aung aung",
          password: "aungaung123",
          email: "aung@gmail.com",
        },
      },
    };

    res = {
      send: (sendDatas) => {
        return sendDatas;
      },
    };

    next = (info) => {
      console.log(info);
    };

    const userData = await userRegisterController(req, res, next);
    // expect(userData.error).toBeFalsy();
  });
});
