const config = require("config");
const express = require("express");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const helpers = require("./helpers/helpers.js");
const handlebars = require("express-handlebars");
const i18n = require('i18n');
const {
  auth
} = require("express-openid-connect");
const crontasks = require("./services/crontasks");
const logger = require("./logger.js");

i18n.configure({
  locales: ['en'],
  directory: path.join(__dirname, '/locales')
})

const app = express();

logger.register(app);

app.use(i18n.init);

if (fs.existsSync(path.join(__dirname, "package.json"))) {
  var package = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json")));
  app.locals.version = package.version;
} else {
  app.locals.version = "0.0.0";
}

if (fs.existsSync(path.join(__dirname, ".build"))) {
  app.locals.builddate = fs.readFileSync(path.join(__dirname, ".build"), "utf8");
} else {
  app.locals.builddate = "-";
}

app.locals.appTitle = "Labortablo";
app.locals.API_BASE = config.get("baseUrl") + "/api";
if (config.has("theme.darkModeHours")) {
  app.locals.THEME_START = config.get("theme.darkModeHours.start");
  app.locals.THEME_END = config.get("theme.darkModeHours.end");
} else {
  app.locals.THEME_START = -1;
  app.locals.THEME_END = -1;
}
app.locals.THEME_NAME = config.get("theme.name");
app.locals.API_INTERNAL_URL = process.env.API_INTERNAL_URL;

const hbs = handlebars.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  helpers: helpers,
  defaultLayout: "material-layout.hbs",
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views/"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.set("Cache-Control", "no-cache, no-store, must-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", 0);
  next();
});

const oidcEnabled = config.get("oidc.enabled") || false;

if (oidcEnabled == true) {
  logger.log("Initialising OIDC");

  var authConfig = {
    authorizationParams: {
      response_type: "code",
      audience: "",
      scope: "openid profile email offline_access groups",
    },
    authRequired: false,
    auth0Logout: false,
    session: {
      cookie: {
        domain: new URL(config.get("baseUrl")).host,
      },
    },
    clientID: config.get("oidc.clientId"),
    clientSecret: config.get("oidc.clientSecret"),
    secret: config.get("oidc.secret"),
    issuerBaseURL: config.get("oidc.issuerBaseUrl"),
  };

  authConfig.authorizationParams.audience = config.get("baseUrl");
  authConfig.baseURL = config.get("baseUrl");
  app.use(auth(authConfig));
}

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/user-icons",
  express.static(path.join(process.env.NODE_CONFIG_DIR, "user-icons")),
);

app.use("/", require("./routes/index.js"));
app.use("/api/containers", require("./routes/api-container.js"));
app.use("/api/repeository", require("./routes/api-repository.js"));
app.use("/api/icons", require("./routes/api-icon.js"));
app.use("/api/bookmarks", require("./routes/api-bookmarks.js"));
app.use("/api/rss", require("./routes/api-rssproxy.js"));
app.use("/api/system", require("./routes/api-system.js"));

crontasks.initialise(app);
crontasks.register(app);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.log(err);
  res.status(500);
  res.send(err);
});

app.reloadConfig = function() {
  delete require.cache[require.resolve('config')];
  require("config");
}

module.exports = app;
