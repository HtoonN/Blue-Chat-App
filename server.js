const App = require("./app");
const db = require("./Database/connectDatabase");
const CreateIo = require("./Socket/socket");

require("dotenv").config();

const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`Server Listen at PORT ${PORT}`);
// });
//start server

const server = new App();

const app = server.getExpressServer();
const socketIo = new CreateIo(app);

server.startServer(PORT);
socketIo.connect();

//connect to DB
new db();
