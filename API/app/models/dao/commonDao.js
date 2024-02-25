let schema = require("../dto/index");

exports.insertdata = async (data, schemaName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collectionName = schema[schemaName];
      resolve(await collectionName.create(data));
    } catch (error) {
      reject(error);
    }
  });
};

exports.getOneData = async (searchFields, schemaName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collectionName = schema[schemaName];
      resolve(
        await collectionName.findOne(
          searchFields.query,
          searchFields.fields,
          searchFields.options
        )
      );
    } catch (error) {
      reject(error);
    }
  });
};

exports.getAll = async (searchFields, schemaName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collectionName = schema[schemaName];
      resolve(
        await collectionName.find(
          searchFields.query,
          searchFields.fields,
          searchFields.options
        )
      );
    } catch (error) {
      reject(error);
    }
  });
};

exports.deleteOne = async (data, schemaName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collectionName = schema[schemaName];
      resolve(await collectionName.deleteOne(data));
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateOne = async (data, schemaName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collectionName = schema[schemaName];
      resolve(await collectionName.updateOne(data.query, data.fields));
    } catch (error) {
      reject(error);
    }
  });
};
