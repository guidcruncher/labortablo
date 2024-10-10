const https = require("https");
const http = require("http");

function httpConnection(url) {
  if (url.startsWith("https")) {
    return https;
  }

  return http;
}

module.exports = httpConnection;
