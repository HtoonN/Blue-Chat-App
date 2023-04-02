const app = require("./app");
const db = require("./Database/connectDatabase");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server Listen at PORT ${PORT}`);
// });
//start server

const server = new app();
const respondFormServer = server.startServer(PORT);
console.log(respondFormServer);

//connect to DB
new db();
