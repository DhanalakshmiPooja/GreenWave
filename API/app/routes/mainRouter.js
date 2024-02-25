const express = require("express");
const app = express();
const constant = require("../utils/constant");

app.use("/config", require("../controller/taskController"));

app.get("/", (_req, res) => {
  res
    .status(constant.config.HTML_STATUS_CODE.BAD_REQUEST)
    .json("Invalid Endpoint");
});

app.get("*", (_req, res) => {
  res
    .status(constant.config.HTML_STATUS_CODE.BAD_REQUEST)
    .json("Invalid Endpoint");
});

module.exports = app;
