const EmailFormatValidation = require("../../HelperFunction/EmailFormatValidation");

describe("Email format validation test", () => {
  it("It should be wrong email address", () => {
    expect(EmailFormatValidation("aungcom")).toBe("Invalid email address!");
  });

  it("It should be right email address", () => {
    expect(EmailFormatValidation("aung@gmail.com")).toBe(true);
  });
});
