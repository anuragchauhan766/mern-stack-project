const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("connection to database is successfull");
  })
  .catch((err) => {
    console.log(err, "connection unsuccesfull");
  });
