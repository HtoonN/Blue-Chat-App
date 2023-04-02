const GenerateId = require("../../Utility/GenerateId");

describe("Test for Generate Id ", () => {
  it("should be truthy value", () => {
    expect(GenerateId()).toBeTruthy();
  });
});
