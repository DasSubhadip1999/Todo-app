require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.URL;
const db = process.env.DB;

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
