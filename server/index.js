const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const { listPlaces, getQuotes, getRoutes } = require("./helpers/apiHelpers.js");

const app = express();

app.use("/", express.static(path.join(__dirname, "../client/dist")));

app.get("/list/places", (req, res) => {
  listPlaces(req.query.word)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/browse/quotes", (req, res) => {
  getQuotes()
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/browse/routes", (req, res) => {
  getRoutes()
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      console.log(err);
    });
});
app.listen(port, () => {
  console.log("connected to server");
});
