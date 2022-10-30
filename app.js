const express = require("express");
const bodyParser = require("body-parser");
const dateModule = require(__dirname + "/src/module.js");
const mongooseModule = require(__dirname + "/src/mongoose.js");
const { fetchLists, deleteItem } = require(__dirname + "/src/action.js");

const app = express();
//DB
mongooseModule.databaseConnection();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//home route
app.get("/", (req, res) => {
  fetchLists()
    .then((data) => {
      res.render("index.ejs", {
        date: dateModule.getDate(),
        list: data,
        heading: "Home",
      });
    })
    .catch((err) => console.log(err));
});

//add items
app.post("/", (req, res) => {
  const { listText } = req.body;
  if (listText && listText.length !== 0) {
    //post data to DB
    const sendData = async () => {
      try {
        let newText = new mongooseModule.ListingModel({
          name: listText,
        });
        newText.save();
      } catch (error) {
        console.log(error);
      }
    };
    sendData();
  }
  res.redirect("/");
});

//delete an item
app.post("/delete/:id", (req, res) => {
  let params = req.params;
  deleteItem(params.id)
    .then((response) => console.log("response", response))
    .catch((error) => console.log(error));
  res.redirect("/");
});

//extra custom get reqs

app.get("/work", (req, res) => {
  res.render("index.ejs", {
    date: dateModule.getDate(),
    list: [],
    heading: "work",
  });
});

app.get("/study", (req, res) => {
  res.render("index.ejs", {
    date: dateModule.getDate(),
    list: [],
    heading: "study",
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
