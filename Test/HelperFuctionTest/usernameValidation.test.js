const {
  UsernameValidation,
} = require("../../HelperFunction/UsernameValidation");

describe("usernameValidation", () => {
  it("length of the username should be at least 8", () => {
    expect(UsernameValidation("aung")).toBe(true);
  });

  it("length of the username should be at least 8", () => {
    expect(UsernameValidation("aungaung88")).toBe(true);
  });
});
