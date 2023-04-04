const UserRegisterModel = require("../../Database/Models/UserRegisterModel");
const CheckEmailandPassword = require("../../Utility/CheckEmailandPassword");

jest.mock("UserRegisterModel");

describe("check email and password ", () => {
  UserRegisterModel.find.mockImplementaion(() =>
    Promise.resolve([
      {
        userId: "123",
        email: "aung@gmail.com",
        password:
          "$2b$10$ZkFsaWw6JhrRJUYjRlZCyO6j9Ydte3kCSedz2NxZnbMGLsWwhGbs6",
      },
    ])
  );
  it("it should be true", () => {
    const obj = new CheckEmailandPassword(
      "aung@gmail.com",
      "smilewiththesmile"
    );

    const ans = obj.checkEmailandPassword();

    expect(ans).tobeTruty();
  });
});
