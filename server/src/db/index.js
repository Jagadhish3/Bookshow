const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongodb is connected!"))
  .catch((err) => console.log("Mongodb error: ", err));

// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("Mongodb error: ", err));
