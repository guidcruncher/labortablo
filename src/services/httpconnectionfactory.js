const logger = require("../logger.js");
const https = require("https");
// const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

function downloadToFile(connection, url, dest) {
  return new Promise((resolve, reject) => {
    try {
      var result = {
        contentType: "",
        url: "",
        filename: "",
        name: "",
        statusCode: 0,
        statusMessage: "",
        error: null
      };
      var fileextn = path.extname(dest);
      var filename = dest;
      var request = connection.get(url, function(response) {
        logger.trace("Begin downloadToFile", url, dest);
        if (response.statusCode == 200) {
          var contentType = response.headers['content-type'];
          var urlextn = mime.extension(contentType);
          filename = dest.replace(fileextn, "." + urlextn);
          logger.trace("Writing to file ", url, filename);
          var file = fs.createWriteStream(filename);
          response.pipe(file);
          file.on('error', function(err) {
            logger.error("Error writing file", url, filename, err);
            if (fs.existsSync(filename)) {
              fs.unlinkSync(filename);
            }
            result.url = url;
            result.statusCode = 500;
            result.error = err;
            reject(result);
          });
          file.on('finish', function() {
            logger.trace("Finished writing ", url, filename);
            file.close(function() {
              result.url = url;
              result.contentType = contentType;
              result.filename = filename;
              result.name = path.basename(filename);
              result.statusCode = response.statusCode;
              result.statusMessage = response.statusMessage;
              resolve(result);
            });
          });
        } else if (response.statusCode == 302 || response.statusCode == 301) {
          logger.trace("Redirecting request", url, response.headers.location);
          downloadToFile(connection, response.headers.location, dest).then((r) => resolve(r)).catch((r) => reject(r));
        } else {
          logger.error("Error  on downloadToFile", url, filename, response.statusCode);
          if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
          }
          result.url = url;
          result.statusCode = response.statusCode;
          request.abort();
          reject(result);
        }
      }).on('error', function(err) { // Handle errors
        logger.error("Error  on downloadToFile", url);
        if (fs.existsSync(filename)) {
          fs.unlinkSync(filename);
        }
        result.url = url;
        result.statusCode = 500;
        result.error = err;
        request.abort();
        reject(result);
      }).on('timeout', function() {
        logger.error("Timeout on downloadToFile", url, filename);
        if (fs.existsSync(filename)) {
          fs.unlinkSync(filename);
        }
        request.abort();
        result.url = url;
        result.statusCode = 500;
        result.statusMessage = "Request timeout";
        reject(result);
      });
      request.end();
    } catch (err) {
      logger.error("Exception in downloadToFile", err);
      reject(err);
    }
  });
}

function downloadToMemory(connection, url) {
  return new Promise((resolve, reject) => {
    try {
      var result = {
        contentType: "",
        url: "",
        value: null,
        statusCode: 0,
        statusMessage: "",
        error: null
      };
      logger.trace("downloadToMemory", url);
      var request = connection.get(url, function(response) {
        if (response.statusCode == 200) {
          var contentType = response.headers['content-type'];
          var body = "";
          response.on("data", function(chunk) {
            logger.trace("downloadToMemory data chunk", url);
            body = body + chunk;
          });
          response.on("end", function() {
            body = body.replace("\ufeff", "").trim();
            logger.warn("data", body);
            logger.trace("downloadToMemory Response end reached ", url);
            result.url = url;
            result.contentType = contentType;
            result.value = body;
            result.statusCode = response.statusCode;
            result.statusMessage = response.statusMessage;
            if (response.statusCode != 200) {
              reject(result);
            } else {
              resolve(result);
            }
          });
        } else if (response.statusCode == 302 || response.statusCode == 301) {
          logger.trace("Redirecting request", url, response.headers.location);
          downloadToMemory(connection, response.headers.location).then((r) => resolve(r)).catch((r) => reject(r));
        } else {
          logger.error("Error  on downloadToMemory", url, response.statusCode);
          result.url = url;
          result.statusCode = response.statusCode;
          request.abort();
          reject(result);
        }
      }).on('error', function(err) { // Handle errors
        logger.error("downloadToMemory error", url, err);
        request.abort();
        result.url = url;
        result.statusCode = 500;
        result.error = err;
        reject(result);
      }).on('timeout', function() {
        logger.error("downloadToMemory timeout", url);
        request.abort();
        result.url = url;
        result.statusCode = 500;
        result.statusMessage = "Request timeout";
        reject(result);
      });
      request.end();
    } catch (err) {
      logger.error("downloadToMemory exception", err);
      reject(err);
    }
  });
}

function create(url) {
  if (url.startsWith("https")) {
    return https;
  }
  return https;
}

module.exports = {
  create,
  downloadToFile,
  downloadToMemory,
}
