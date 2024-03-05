const app = require("./app");
const mongoose = require("mongoose");
const serverConfigs = require("./configs/serverConfigs");

mongoose
  .connect(serverConfigs.mongoUrl)
  .then(() => {
    console.log("Database connection successful");
    app.listen(serverConfigs.port, () => {
      console.log(`server port is ${serverConfigs.port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
