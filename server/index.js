const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const {
  listPlaces,
  getQuotes,
  getRoutes,
  createSession,
  pollSession
} = require("./helpers/apiHelpers.js");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
  exposedHeaders: "Authorization"
};

const app = express();

app.use("/", express.static(path.join(__dirname, "../client/dist")));

app.use(cors(corsOptions));
app.use(bodyParser.json());

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

app.post("/search", (req, res) => {
  createSession(
    req.body.fromDestination,
    req.body.toDestination,
    req.body.cabin,
    req.body.adults,
    req.body.departDate,
    req.body.returnDate
  )
    .then(result => {
      let splitUrl = result.headers.location.split("/");
      return pollSession(splitUrl[splitUrl.length - 1]);
    })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
      res.send("ERROR");
    });
});

app.listen(port, () => {
  console.log("connected to server");
});
