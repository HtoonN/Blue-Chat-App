exports.corsConfig = {
  origin: [
    "http://localhost:3000",
    "https://bluechatapp.netlify.app",
    "https://bluechatapp1.onrender.com",
    "https://bluechatappgit.netlify.app/",
  ],
  methods: ["GET", "POST", "DELETE", "PATCH"],
  header: "*",
  credentials: true,
};
