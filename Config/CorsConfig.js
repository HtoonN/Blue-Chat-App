exports.corsConfig = {
  origin: ["http://localhost:3000", "https://bluechatapp.netlify.app"],
  methods: ["GET", "POST", "DELETE", "PATCH"],
  header: "*",
  credentials: true,
};
