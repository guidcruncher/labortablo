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
app.locals.API_BASE = process.env.API_BASE;

if (!app.locals.API_BASE.includes("http")) {
  app.locals.API_BASE = process.env.BASE_URL + process.env.API_BASE;
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

const oidcEnabled = process.env.OIDC_ENABLED || "false";

if (oidcEnabled == "true") {
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
        domain: new URL(process.env.BASE_URL).host,
      },
    },
    clientID: process.env.OIDC_CLIENTID,
    clientSecret: process.env.OIDC_CLIENTSECRET,
    secret: process.env.OIDC_SECRET,
    issuerBaseURL: process.env.OIDC_ISSUER_URL,
  };

  const port = process.env.WEB_PORT || 9081;

  if (
    !process.env.BASE_URL &&
    process.env.WEB_PORT &&
    process.env.NODE_ENV !== "production"
  ) {
    authConfig.baseURL = `http://localhost:${port}`;
    authConfig.authorizationParams.audience = authConfig.baseURL;
  } else authConfig.baseURL = process.env.BASE_URL;
  authConfig.authorizationParams.audience = authConfig.baseURL;
  app.use(auth(authConfig));
}

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/user-icons",
  express.static(path.join(process.env.NODE_CONFIG_DIR, "icons")),
);

app.use("/", indexRouter);

module.exports = app;
