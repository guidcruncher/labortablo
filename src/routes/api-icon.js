const logger = require("../logger.js");
const express = require("express");
const router = express.Router();
const iconresolver = require("../services/iconresolver.js");
const mime = require("mrmime");
const fs = require("fs");
const path = require("path");

router.get("/labortablo.svg", function(req, reply) {
  var fulliconName = path.join(__dirname, "../public/images", "/logo.svg");
  var color = req.query.color ? req.query.color : "0C0310";

  if (!fs.existsSync(fulliconName)) {
    fulliconName = path.join(__dirname, "../public/images/unknown.png");
    reply.status(404).send(fs.readFileSync(fulliconName));
    return;
  }

  var fileContents = fs
    .readFileSync(fulliconName)
    .toString()
    .replace(/0C0310/g, color);

  reply
    .header("content-disposition", `inline; filename="logo.svg"`)
    .header("content-type", mime.lookup(fulliconName))
    .header("content-length", fs.statSync(fulliconName).size)
    .send(fileContents);
});

router.get("/logo", function(req, reply) {
  var fulliconName = path.join(__dirname, "../public/images", "/logo.svg");
  var color = req.query.color ? req.query.color : "0C0310";

  if (!fs.existsSync(fulliconName)) {
    fulliconName = path.join(__dirname, "../public/images/unknown.png");
    reply.status(404).end(fs.readFileSync(fulliconName), "binary");
    return;
  }

  var fileContents = fs
    .readFileSync(fulliconName)
    .toString()
    .replace(/0C0310/g, color);

  reply
    .header("content-disposition", `inline; filename="logo.svg"`)
    .header("content-type", mime.lookup(fulliconName))
    .header("content-length", fs.statSync(fulliconName).size)
    .end(fileContents);
});

router.get("/simple", function(req, reply) {
  var slug = req.query.name;
  var url = iconresolver.getSimpleIconUrl(slug);

  logger.log("SimpleIcon " + slug + " resolved to " + url);

  if (url == "") {
    reply.status(404).send();
  } else {
    reply.redirect(url);
  }
});

router.get("/:iconName", function(req, reply) {
  var iconCacheFolder = process.env.PERSISTENCE_STORE;

  var fulliconName = path.join(
    iconCacheFolder,
    "/services/" + req.params.iconName,
  );

  if (!fs.existsSync(fulliconName)) {
    logger.log(fulliconName + " Unavailable.");
    fulliconName = path.join(__dirname, "../public/images/unknown.png");
    reply.status(200).end(fs.readFileSync(fulliconName), "binary");
    return;
  }

  const {
    iconName
  } = req.params;
  reply
    .header("content-disposition", `inline; filename="${iconName}"`)
    .header("content-type", mime.lookup(fulliconName))
    .header("content-length", fs.statSync(fulliconName).size)
    .end(fs.readFileSync(fulliconName), "binary");
});

module.exports = router;
