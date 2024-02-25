"use strict";
const empty = require("lodash").isEmpty;
const commonDao = require("../models/dao/commonDao");
const constant = require("../utils/constant").config;
const customResponse = require("../utils/customResponse");
const moment = require("moment");

exports.addTask = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let insertdata = req.body,
        searchFields = {
          query: {
            taskId: insertdata.taskId,
          },
          fields: {},
          options: {},
        };

      if (
        !insertdata.taskId ||
        !insertdata.title ||
        !insertdata.description ||
        !insertdata.assignDate ||
        !insertdata.assignTo ||
        !insertdata.dueDate
      )
        return reject(
          customResponse.error(
            constant.HTML_STATUS_CODE.NOT_FOUND,
            "Please enter all required details"
          )
        );
      const dbData = await commonDao.getOneData(searchFields, "task");
      if (!empty(dbData)) {
        reject(
          customResponse.error(
            constant.HTML_STATUS_CODE.ALREADY_EXISTS,
            "Task already exists try with another ID"
          )
        );
      } else {
        insertdata.status = false;
        let addTaskToDB = await commonDao.insertdata(insertdata, "task");
        resolve(addTaskToDB);
      }
    } catch (error) {
      reject(
        customResponse.error(
          constant.HTML_STATUS_CODE.INTERNAL_ERROR,
          "We've detected a technical glitch. Apologies for the inconvenience."
        )
      );
    }
  });
};

exports.getTask = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFields = {
        query: {},
        fields: {},
        options: {},
      };

      searchFields.fields = "-_id -__v";
      let task = await commonDao.getAll(searchFields, "task");
      empty(task)
        ? reject(
            customResponse.info(
              constant.HTML_STATUS_CODE.NOT_FOUND,
              "No tasks configured"
            )
          )
        : resolve(task);
    } catch (error) {
      console.log(error);
      reject(
        customResponse.error(
          constant.HTML_STATUS_CODE.INTERNAL_ERROR,
          "We've detected a technical glitch. Apologies for the inconvenience."
        )
      );
    }
  });
};

exports.updateTask = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let updateData = req.body,
        searchFields = {
          query: {
            taskId: req.params.taskId,
          },
          fields: {},
          options: {},
        };
      if (
        !updateData.taskId ||
        !updateData.title ||
        !updateData.description ||
        !updateData.assignDate ||
        !updateData.assignTo ||
        !updateData.dueDate
      )
        return reject(
          customResponse.error(
            constant.HTML_STATUS_CODE.NOT_FOUND,
            "Please enter all required details"
          )
        );
      let dBData = await commonDao.getOneData(searchFields, "task");
      if (empty(dBData))
        reject(
          customResponse.error(
            constant.HTML_STATUS_CODE.NOT_FOUND,
            `Task ID ${req.params.taskId} not found`
          )
        );
      else {
        searchFields.fields = { $set: updateData };
        await commonDao.updateOne(searchFields, "task").then((result) => {
          result.modifiedCount
            ? resolve(`Task ID ${updateData.taskId} Updated Successfully`)
            : reject(
                customResponse.error(
                  constant.HTML_STATUS_CODE.ALREADY_EXISTS,
                  "No changes detected"
                )
              );
        });
      }
    } catch (error) {
      reject(
        customResponse.error(
          constant.HTML_STATUS_CODE.INTERNAL_ERROR,
          "We've detected a technical glitch. Apologies for the inconvenience."
        )
      );
    }
  });
};

exports.deleteTask = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchFields = {
        query: {
          taskId: req.params.taskId,
        },
        fields: {},
        options: {},
      };

      await commonDao
        .deleteOne(searchFields.query, "task")
        .then((result) =>
          result.deletedCount
            ? resolve(`Task Id ${req.params.taskId} deleted successfully`)
            : reject(
                customResponse.error(
                  constant.HTML_STATUS_CODE.NOT_FOUND,
                  `Task Id ${req.params.taskId} not found to delete`
                )
              )
        );
    } catch (error) {
      reject(
        customResponse.error(
          constant.HTML_STATUS_CODE.INTERNAL_ERROR,
          "We've detected a technical glitch. Apologies for the inconvenience."
        )
      );
    }
  });
};
