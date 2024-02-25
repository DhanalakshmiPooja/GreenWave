const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const app = express();

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, OPTIONS, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, save-path, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, X-Access-Token, X-Key"
  );
  res.setHeader("Access-Control-Max-Age", 0);
  if (req.method == "OPTIONS") res.sendStatus(204).end();
  else next();
});

app.use(compression());
app.use(
  bodyParser.json({
    limit: "50mb",
    extended: true,
  })
);

app.use("/", require("./routes/mainRouter"));
module.exports = app;
