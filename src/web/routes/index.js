var express = require("express");
var router = express.Router();
var Client = require("node-rest-client").Client;

router.get("/", function (req, res) {
  var url = process.env.API_INTERNAL_URL + "/containers";
  var client = new Client();

  client.get(url, function (data) {
    res.render("index", {
      title: "Labortablo",
      API_BASE: process.env.API_BASE,
      containers: data,
    });
  });
});

module.exports = router;
