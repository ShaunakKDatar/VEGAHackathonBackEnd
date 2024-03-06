const mongoose = require("mongoose");

module.exports = function () {
  mongoose.connect("").then(() => {
    console.log("Connected to Mongoose");
  });
};
