const mongoose = require("mongoose");

const dbConnection = async () => {
  const dbUrl = process.env.DB_URL;
  const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(dbUrl, config);

    console.log("Db Online");
  } catch (error) {
    console.log(error);
    throw new Error(`Error connecting to Database`);
  }
};

module.exports = dbConnection;
