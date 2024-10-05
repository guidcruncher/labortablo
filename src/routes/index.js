const express = require("express");
const router = express.Router();
const requiresAuth = require("../oidcHelper.js");
const Client = require("node-rest-client").Client;

router.get("/", requiresAuth(), function (req, res) {
  var promises = [];
  var data = {
    title: "Home",
    ticker: [],
    newsfeeds: [],
    feeds: [],
    tickerDelay: 0,
    feedCount: 0,
  };

  promises.push(
    new Promise((resolve, reject) => {
      var url = "http://127.0.0.1:9080/api/rss/ticker";
      var client = new Client();
      var req = client.get(url, function (result) {
        data.feeds = result.feeds;
        data.ticker = result.urls;
        data.feedCount = result.itemCount;
        resolve(result);
      });
      req.on("error", function (err) {
        reject(err);
      });
    }),
  );

  promises.push(
    new Promise((resolve, reject) => {
      var url = "http://127.0.0.1:9080/api/rss/feeds";
      var client = new Client();
      var req = client.get(url, function (result) {
        data.newsfeeds = result.feeds;
        resolve(result);
      });
      req.on("error", function (err) {
        reject(err);
      });
    }),
  );
  promises.push(
    new Promise((resolve, reject) => {
      var url = "http://127.0.0.1:9080/api/containers";
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
      var url = "http://127.0.0.1:9080/api/bookmarks";
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

  promises.push(
    new Promise((resolve, reject) => {
      var url = "http://127.0.0.1:9080/api/system";
      var client = new Client();
      var req = client.get(url, function (sysinfo) {
        data.systeminfo = sysinfo;
        resolve(sysinfo);
      });
      req.on("error", function (err) {
        reject(err);
      });
    }),
  );

  Promise.allSettled(promises)
    .then(() => {
      data.tickerDelay = data.feedCount * 5;
      res.render("index", data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
