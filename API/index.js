const http = require("http");

const server = require("./app/server");
const config = require("./app/utils/constant").config;
const connectDb = require("./app/models/db");

connectDb.dbInit();

const startServer = async () => {
  const app = http.createServer(server);
  app.listen(config.PORT);
  app.on("listening", () => {
    app.timeout = 90000;
    console.log(`Server running on port ${config.PORT}`);
  });
  app.on("error", (error) =>
    console.log("!Unable to start the Server:", error)
  );
};

startServer();
