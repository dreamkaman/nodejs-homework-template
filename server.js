const app = require("./app");

const mongoose = require("mongoose");

// const dotenv = require("dotenv");

// dotenv.config();

// const DB_HOST =
//   "mongodb+srv://Vlad:eKnFNsie8chkaUD@cluster0.u67sh.mongodb.net/db-contacts?retryWrites=true&w=majority";

// const { DB_HOST } = require("./config");
const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    // app.listen(PORT);
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
    // console.log("Database connection successful")
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
