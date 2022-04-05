const mangoose = require("mangoose");

const DB_HOST =
  "mongodb+srv://Vlad:eKnFNsie8chkaUD@cluster0.u67sh.mongodb.net/db-contacts?retryWrites=true&w=majority";

mangoose
  .connect(DB_HOST)
  .then(() => console.log("Database connected successfuly"))
  .catch((error) => console.log(error.message));
