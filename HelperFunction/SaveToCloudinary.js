const cloudinary = require("cloudinary").v2;

class ManageCloudinary {
  constructor(filename, folder) {
    this.name = filename;
    this.folder = folder;
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }
  async saveToCloudinary() {
    let public_id = this.name.toString().split(".")[0];
    if (this.folder === "image" || "video") {
      return await cloudinary.uploader.upload(
        `File/${this.name}`,
        {
          resource_type: this.folder,
          public_id: `${public_id}`,
          folder: "BlueChatApp",
          invalidate: true,
          crop: "fill",
        },
        function (error, result) {
          if (error) {
            console.log(error);
          } else {
            return result;
          }
        }
      );
    } else {
      return {
        error: true,
        informaton: "File Type is not support",
      };
    }
  }
}

module.exports = ManageCloudinary;
