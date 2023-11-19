
const db = require("./models");
const createConnection = async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log("Synced db.");
  } catch (error) {
    console.log("createConnection has an error:", error);
    throw error;
  }
}

const dbConnection = async (params) => {
  let retries = 5;
  while (retries) {
    try {
      console.log("createConnection is called")
      await createConnection();
      console.log("connection is made");
      break;
    } catch (error) {
      console.log("db connection in while loop", error);
      retries = retries - 1;
      console.log(`retries count: ${retries}`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
}

module.exports = {
    dbConnection
} ;