const { db, Table } = require("./db.config.js");

// Create or Update users
const createOrUpdateLambdaFunction = async (data = {}) => {
  const params = {
    TableName: Table,
    Item: data,
  };

  try {
    await db.put(params).promise();
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// Read all users
const readAllUsersLambdaFunction = async () => {
  const params = {
    TableName: Table,
  };
  try {
    const { Items = [] } = await db.scan(params).promise();
    console.log(Items);
    return { success: true, data: Items };
  } catch (error) {
    return { success: false, data: null };
  }
};

// Read Users by ID
const getUserByIdLambdaFunction = async (value, key = "id") => {
  const params = {
    TableName: Table,
    Key: {
      [key]: parseInt(value),
    },
  };
  try {
    const { Item = {} } = await db.get(params).promise();
    return { success: true, data: Item };
  } catch (error) {
    return { success: false, data: null };
  }
};

// Delete User by ID
const deleteUserByIdLambdaFunction = async (value, key = "id") => {
  const params = {
    TableName: Table,
    Key: {
      [key]: parseInt(value),
    },
  };

  try {
    await db.delete(params).promise();
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

module.exports = { createOrUpdateLambdaFunction, readAllUsersLambdaFunction, getUserByIdLambdaFunction, deleteUserByIdLambdaFunction };
