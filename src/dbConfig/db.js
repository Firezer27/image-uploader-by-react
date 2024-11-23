const mongoose = require("mongoose"); 

// MongoDB Connection URI
mongoose
  .connect("mongodb://localhost:27017/imageUploader", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

  module.exports = mongoose;
