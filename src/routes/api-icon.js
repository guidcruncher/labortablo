const express = require("express");
const router = express.Router();
const iconresolver = require("../services/iconresolver.js");
const fs = require("fs");
const path = require("path");

  router.get("/labortablo.svg", function (req, reply) {
    var fulliconName = path.join(__dirname, "../public/images", "/logo.svg");
    var color = req.query.color ? req.query.color : "0C0310";

    if (!fs.existsSync(fulliconName)) {
      fulliconName = path.join(__dirname, "../public/images/unknown.png");
      reply.code(404).send(fs.createReadStream(fulliconName));
      return;
    }

    var fileContents = fs
      .readFileSync(fulliconName)
      .toString()
      .replace(/0C0310/g, color);

    reply
      .header("content-disposition", `inline; filename="logo.svg"`)
      .header("content-type", iconresolver.getMimeType(fulliconName))
      .header("content-length", fs.statSync(fulliconName).size)
      .send(fileContents);
  });

  router.get("/logo", function (req, reply) {
    var fulliconName = path.join(__dirname, "../public/images", "/logo.svg");
    var color = req.query.color ? req.query.color : "0C0310";

    if (!fs.existsSync(fulliconName)) {
      fulliconName = path.join(__dirname, "../public/images/unknown.png");
      reply.code(404).send(fs.createReadStream(fulliconName));
      return;
    }

    var fileContents = fs
      .readFileSync(fulliconName)
      .toString()
      .replace(/0C0310/g, color);

    reply
      .header("content-disposition", `inline; filename="logo.svg"`)
      .header("content-type", iconresolver.getMimeType(fulliconName))
      .header("content-length", fs.statSync(fulliconName).size)
      .send(fileContents);
  });

  router.get("/:iconName", function (req, reply) {
    var iconCacheFolder = process.env.PERSISTENCE_STORE;

    var fulliconName = path.join(
      iconCacheFolder,
      "/services/" + req.params.iconName,
    );

    if (!fs.existsSync(fulliconName)) {
      fulliconName = path.join(__dirname, "../public/images/unknown.png");
      reply.code(404).send(fs.createReadStream(fulliconName));
      return;
    }

    const { iconName } = req.params;
    reply
      .header("content-disposition", `inline; filename="${iconName}"`)
      .header("content-type", iconresolver.getMimeType(fulliconName))
      .header("content-length", fs.statSync(fulliconName).size)
      .send(fs.createReadStream(fulliconName));
  });

module.exports =rpiter;
