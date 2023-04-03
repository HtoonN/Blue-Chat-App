const AddLoginDecives = require("../../../UserClasses/UpdateClass/AddLoginDevices");

describe("Add Login Devices ", () => {
  it("it should be true ", () => {
    const resultObj = new AddLoginDecives("123");
    console.log(resultObj.update());
  });
});
