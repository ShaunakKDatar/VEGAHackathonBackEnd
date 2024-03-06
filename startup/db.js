const mongoose = require("mongoose");

module.exports = function () {
  mongoose.connect("mongodb+srv://4chan:FgHVMSaaBsEnUeNd@cluster0.opcwhlf.mongodb.net/vegaModels").then(() => {
    console.log("Connected to Mongoose");
  });
};
