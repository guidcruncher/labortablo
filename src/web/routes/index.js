var express = require("express");
var router = express.Router();
var Client = require("node-rest-client").Client;

router.get("/", function (req, res) {
  var promises = [];
  var data = {
    title: "Home",
    API_BASE: process.env.API_BASE,
  };

  promises.push(
    new Promise((resolve, reject) => {
      var url = process.env.API_INTERNAL_URL + "/containers";
      var client = new Client();
      var req = client.get(url, function (containers) {
        data.containers = containers;
        resolve(containers);
      });
      req.on("error", function (err) {
        reject(err);
      });
    }),
  );

  promises.push(
    new Promise((resolve, reject) => {
      var url = process.env.API_INTERNAL_URL + "/bookmarks";
      var client = new Client();
      var req = client.get(url, function (bookmarks) {
        data.bookmarks = bookmarks;
        resolve(bookmarks);
      });
      req.on("error", function (err) {
        reject(err);
      });
    }),
  );

  Promise.all(promises)
    .then(() => {
      res.render("index", data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("errorl-");
    });
});

module.exports = router;
