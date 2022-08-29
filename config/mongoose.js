const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/expressjs_db")
  .then(() => {
    console.log("successfully");
  })
  .catch((e) => {
    console.log(`no connection`);
  });
