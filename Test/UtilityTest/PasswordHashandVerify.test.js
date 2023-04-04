const PasswordHash = require("../../Utility/PasswordHash");
const PasswordVerify = require("../../Utility/PasswordVerify");

let hashkey = "";
const password = "smilewiththesmile";

describe("Test for PasswordHash", () => {
  it("it should be true", async () => {
    const hashkey = await PasswordHash(password);
    console.log(hashkey);
    expect(hashkey).toBeTruthy();
  });

  it("it should be false", () => {
    return PasswordHash("Hello").then((e) => {
      expect(e).toBeFalsy();
    });
  });
});

describe("Test for PasswordVerify", () => {
  it("it should be true", () => {
    const ans = PasswordVerify(password, hashkey);

    expect(ans).toBeTruthy();
  });
});
