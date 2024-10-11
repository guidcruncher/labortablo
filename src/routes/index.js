const logger = require("../logger.js");
const express = require("express");
const router = express.Router();
const requiresAuth = require("../oidchelper.js");
const Client = require("node-rest-client").Client;
const fs = require("fs");
const path = require("path");

function isFirstRun() {
  var filename = path.join(process.env.NODE_CONFIG_DIR, "firstrun.txt");
  if (fs.existsSync(filename)) {
    // fs.unlinkSync(filename);
    return true;
  }
  return false;
}

router.get("/", requiresAuth(), function(req, res) {
  console.log(req.app.engine);
  if (req.query.setup || isFirstRun()) {
    logger.debug("Redirecting to first run setup page as requested.");
    res.redirect("/setup");
    return;
  }

  logger.debug("Rendering dashboard page");

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
      var url = req.app.locals.API_INTERNAL_URL + "/rss/ticker";
      var client = new Client();
      var creq = client.get(url, function(result) {
        data.feeds = result.feeds;
        data.ticker = result.urls;
        data.feedCount = result.itemCount;
        resolve(result);
      });
      creq.on("error", function(err) {
        logger.error("Error in ticker api", err);
        reject(err);
      });
    }),
  );

  promises.push(
    new Promise((resolve, reject) => {
      var url = req.app.locals.API_INTERNAL_URL + "/rss/feeds";
      var client = new Client();
      var creq = client.get(url, function(result) {
        data.newsfeeds = result.feeds;
        resolve(result);
      });
      creq.on("error", function(err) {
        logger.error("Error in feed api", err);
        reject(err);
      });
    }),
  );
  promises.push(
    new Promise((resolve, reject) => {
      var url = req.app.locals.API_INTERNAL_URL + "/containers";
      var client = new Client();
      var creq = client.get(url, function(containers) {
        data.containers = containers;
        resolve(containers);
      });
      creq.on("error", function(err) {
        logger.error("Error in container api", err);
        reject(err);
      });
    }),
  );

  promises.push(
    new Promise((resolve, reject) => {
      var url = req.app.locals.API_INTERNAL_URL + "/bookmarks";
      var client = new Client();
      var creq = client.get(url, function(bookmarks) {
        data.bookmarks = bookmarks;
        resolve(bookmarks);
      });
      creq.on("error", function(err) {
        logger.error("Error in bookmark api", err);
        reject(err);
      });
    }),
  );

  promises.push(
    new Promise((resolve, reject) => {
      var url = req.app.locals.API_INTERNAL_URL + "/system";
      var client = new Client();
      var creq = client.get(url, function(sysinfo) {
        data.systeminfo = sysinfo;
        resolve(sysinfo);
      });
      creq.on("error", function(err) {
        logger.error("Error in system api", err);
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
      logger.error("Error in index route", err);
      res.status(500).send(err);
    });
});

module.exports = router;
