// const app = require("./app");

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

// const DB_HOST =
//   "mongodb+srv://Vlad:eKnFNsie8chkaUD@cluster0.u67sh.mongodb.net/db-contacts?retryWrites=true&w=majority";

// const { DB_HOST } = require("./config");
const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
