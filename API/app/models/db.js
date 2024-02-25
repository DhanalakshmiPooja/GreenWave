"use strict";

const _ = require("lodash");
const mongoose = require("mongoose");
const config = require("../utils/constant").config;

exports.dbInit = async () => {
  try {
    let db = mongoose.connection;

    mongoose.connect(
      `mongodb://${config.database.host}:${config.database.port}/${config.database.db}`
    );

    db.on("open", async function () {
      console.log("Database Connected...");
    });

    db.on("reconnected", function () {
      console.log("Database reconnected...");
    });

    db.on("error", function (error) {
      console.log("Database connection error..." + JSON.stringify(error));
      setTimeout(() => {
        dbInit();
      }, 20000);
    });
  } catch (error) {
    console.log("Database connection error..." + JSON.stringify(error));
    setTimeout(() => {
      dbInit();
    }, 20000);
  }
};
