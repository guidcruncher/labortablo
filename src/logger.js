 const crypto = require("crypto");
 const log4js = require("log4js");
 const logger = log4js.getLogger();
 const config = require("config");

 function register(app) {
   logger.level = "trace";

   if (config.has("logging")) {
     logger.level = config.get("logging.level");
   }


   app.use((req, res, next) => {
     const headerName = "X-Request-Id";
     var value = req.get(headerName);
     var id = value === undefined ? crypto.randomUUID() : value;
     req["id"] = id;
     res.set(headerName, id);
     trace("Begin => " + req["id"].substring(0, 8) + " " + req.url);

     res.once('finish', () => {
       trace("End   => " + req["id"].substring(0, 8) + " " + res.statusCode);
     });

     next();
   });

 }

 function trace(...args) {
   logger.trace(...args);
 }

 function debug(...args) {
   logger.debug(...args);
 }

 function warn(...args) {
   logger.warn(...args);
 }

 function info(...args) {
   logger.info(...args);
 }

 function fatal(...args) {
   logger.fatal(...args);
 }

 function error(...args) {
   logger.error(...args);
 }

 function log(...args) {
   logger.debug(...args);
 }

 module.exports = {
   register,
   trace,
   debug,
   warn,
   info,
   fatal,
   error,
   log
 }
