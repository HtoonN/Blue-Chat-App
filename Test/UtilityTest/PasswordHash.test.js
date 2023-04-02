const PasswordHash = require("../../Utility/PasswordHash");

describe("Test for PasswordHash", () => {
  it("it should be true", async () => {
    const a = await PasswordHash("HelloWorld");
    console.log(a);
    expect(a).toBeTruthy();
  });

  it("it should be false", () => {
    return PasswordHash("Hello").then((e) => {
      expect(e).toBe("Password must be at least 8 characters");
    });
  });
});
