const { verifyAuth } = require("../../HelperFunction/VerifyJWT");

describe("VerifyJWT test", () => {
  it("it should be true", () => {
    const verifyJWTUserDatas = verifyAuth(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhdW5nIiwiZW1haWwiOiJhdW5nQGdtYWlsLmNvbSIsImlhdCI6MTY4MDQyMzg0NH0.dcJrIIGicGSvJ7l0UfWy3Yz7FlhiF5rgWHaPTaeE_fs"
    );
    console.log(verifyJWTUserDatas);
    expect(verifyJWTUserDatas).toBeTruthy();
  });
});
