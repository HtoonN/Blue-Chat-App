const createJWT = require("../../HelperFunction/CreateJWT");

describe("Test for create jwt token", () => {
  it("it should be a token", () => {
    try {
      const ans = createJWT("aung", "aung@gmail.com");
      console.log(ans);
      expect(ans).toBeTruthy();
    } catch {
      (e) => console.log(e);
    }
  });
});
