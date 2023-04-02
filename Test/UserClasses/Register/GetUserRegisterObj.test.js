const BuildUserOBj = require("../../../UserClasses/Register/UserRegisterClass");

describe("Test fro Getuserregister object", () => {
  it("this should be  true", async () => {
    const userObj2 = new BuildUserOBj();
    const getUserData = await userObj2.addUserData(
      "aungaung22",
      "aung23456789",
      "aung@gmail.com"
    );
    expect(getUserData.error).toBeFalsy();
  });

  it("This should be password error", async () => {
    const userObj = new BuildUserOBj();
    const getUserData2 = await userObj.addUserData(
      "winwin345",
      "winwin",
      "win@gmail.com"
    );

    expect(getUserData2.error).toBeTruthy();
  });

  it("This should be email error", async () => {
    const userObj = await new BuildUserOBj();
    const getUserData2 = await userObj.addUserData(
      "winwin345",
      "winwin93453",
      "winom"
    );
    expect(getUserData2.error).toBeTruthy();
  });

  it("This should be username error", async () => {
    const userObj = await new BuildUserOBj();
    const getUserData2 = await userObj.addUserData(
      "win",
      "winwin2345",
      "win@gmail.com"
    );
    expect(getUserData2.error).toBeTruthy();
  });

  it("This should be error", async () => {
    const userObj = await new BuildUserOBj();
    const getUserData2 = await userObj.addUserData("win", "win", "win");
    console.log(getUserData2);
    expect(getUserData2.error).toBeTruthy();
  });
});
