const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

function httpConnection(url) {
  var obj = {};
  if (url.startsWith("https")) {
    obj = https;
  } else {
    obj = http;
  }

  obj.downloadFile = function(url, dest) {
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

        var request = this.get(url, function(response) {
          var contentType = response.headers['content-type'];
          var urlextn = mime.extension(contentType);
          filename = dest.replace(fileextn, "." + urlextn);
          var file = fs.createWriteStream(filename);

          response.pipe(file);
          file.on('error', function(err) {
            if (fs.existsSync(filename)) {
              fs.unlinkSync(filename);
            }
            result.url = url;
            result.statusCode = 500;
            result.error = err;
            reject(result);
          });

          file.on('finish', function() {
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
        }).on('error', function(err) { // Handle errors
          if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
          }
          result.url = url;
          result.statusCode = 500;
          result.error = err;
          reject(result);
        }).on('timeout', function() {
          if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
          }
          request.abort();
          result.url = url;
          result.statusCode = 500;
          result.statusMessage = "Request timeout";
          reject(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  obj.downloadToMemory = function(url) {
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

        var request = this.get(url, function(response) {
          var contentType = response.headers['content-type'];
          var body = "";

          response.on("data", function(chunk) {
            body = body + chunk;
          });

          response.on("end", function() {
            result.url = url;
            result.contentType = contentType;
            result.value = body;
            result.statusCode = response.statusCode;
            result.statusMessage = response.statusMessage;
            resolve(result);
          });
        }).on('error', function(err) { // Handle errors
          result.url = url;
          result.statusCode = 500;
          result.error = err;
          reject(result);
        }).on('timeout', function() {
          request.abort();
          result.url = url;
          result.statusCode = 500;
          result.statusMessage = "Request timeout";
          reject(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  return obj;
}

module.exports = httpConnection;
