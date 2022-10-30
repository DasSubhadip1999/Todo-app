const mongoose = require("mongoose");
const url =
  process.env.URL ||
  "mongodb+srv://subhadipdas:Subha%40123@cluster0.nwqn686.mongodb.net";
//const port = process.env.PORT || "27017";
const db = process.env.DB || "todolistDB";

exports.databaseConnection = () => {
  mongoose
    .connect(`${url}/${db}`)
    .then(() => console.log("App connected to DB"))
    .catch((err) => console.log(err));
};

const ListingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name of todoitem required"],
  },
});

exports.ListingModel = new mongoose.model("Listing", ListingSchema);
