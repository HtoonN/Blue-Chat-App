const cloudinary = require("cloudinary").v2;

class ManageCloudinary {
  constructor(filename, type) {
    this.name = filename;
    this.type = type;
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }
  async saveToCloudinary() {
    let public_id = this.name.toString().split(".")[0];
    if (this.type === "image" || "video") {
      return await cloudinary.uploader.upload(
        `File/${this.name}`,
        {
          resource_type: this.type,
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

  async imageDeleteToCloudinary(public_id) {
    return await cloudinary.uploader.destroy(public_id);
  }

  async videoDeleteToCloudinary(public_id) {
    return await cloudinary.uploader.destroy(public_id, {
      resource_type: "video",
    });
  }
}

module.exports = ManageCloudinary;
