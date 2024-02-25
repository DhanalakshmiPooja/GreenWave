"use strict";
const router = require("express").Router();
const constant = require("../utils/constant").config;
const task = require("../services/taskService");

router.post("/addTask", (req, res) => {
  task
    .addTask(req)
    .then((result) => {
      let response = {
        status: "Success",
        code: constant.HTML_STATUS_CODE.SUCCESS,
        message: `Task added successfully`,
        data: result,
      };
      res.status(constant.HTML_STATUS_CODE.SUCCESS).json(response);
    })
    .catch((error) =>
      res
        .status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR)
        .json(error)
    );
});

router.get("/getTask", (req, res) => {
  task
    .getTask(req)
    .then((result) => {
      let response = {
        status: "Success",
        code: constant.HTML_STATUS_CODE.SUCCESS,
        message: `Task retrieved successfully`,
        data: result,
      };
      res.status(constant.HTML_STATUS_CODE.SUCCESS).json(response);
    })
    .catch((error) =>
      res
        .status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR)
        .json(error)
    );
});

router.put("/updateTask/:taskId", (req, res) => {
  task
    .updateTask(req)
    .then((result) => {
      let response = {
        status: "Success",
        code: constant.HTML_STATUS_CODE.SUCCESS,
        message: `Task updated successfully`,
        data: result,
      };
      res.status(constant.HTML_STATUS_CODE.SUCCESS).json(response);
    })
    .catch((error) =>
      res
        .status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR)
        .json(error)
    );
});

router.delete("/deleteTask/:taskId", (req, res) => {
  task
    .deleteTask(req)
    .then((result) => {
      let response = {
        status: "Success",
        code: constant.HTML_STATUS_CODE.SUCCESS,
        message: `Task Deleted successfully`,
        data: result,
      };
      res.status(constant.HTML_STATUS_CODE.SUCCESS).json(response);
    })
    .catch((error) =>
      res
        .status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR)
        .json(error)
    );
});

module.exports = router;
