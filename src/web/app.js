const config = require("config");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helpers = require("./helpers/helpers.js");
const indexRouter = require("./routes/index");
const handlebars = require("express-handlebars");
const { auth } = require("express-openid-connect");
const logger = require("pino-http");

const app = express();
app.use(logger({ logger: require("./logger.js") }));
app.locals.appTitle = "Labortablo";
app.locals.API_BASE = config.get("apiBaseUrl");

if (!app.locals.API_BASE.includes("http")) {
  app.locals.API_BASE = process.env.BASE_URL + config.get("apiBaseUrl");
}

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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.set("Cache-Control", "no-cache, no-store, must-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", 0);
  next();
});

const oidcEnabled = config.get("oidc.enabled") || false;

if (oidcEnabled == true) {
  console.log("Initialising OIDC");

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
    issuerBaseURL: config.get("oidc.discoverUrl"),
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

app.use("/", indexRouter);

module.exports = app;
