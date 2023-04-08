require("dotenv").config();

const socketCorsConfig = {
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true,
};

module.exports = socketCorsConfig;
