const config = require("config");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helpers = require("./helpers/helpers.js");
const handlebars = require("express-handlebars");
const { auth } = require("express-openid-connect");
const crontasks = require("./services/crontasks");
const morgan = require("morgan");
const crypto = require("crypto");

const app = express();

app.use((req, res, next) => {
  const headerName = "X-Request-Id";
  var value = req.get(headerName);
  var id = value === undefined ? crypto.randomUUID() : value;
  req["id"] = id;
  res.set(headerName, id);
  next();
});

morgan.token("id", (req) => req.id.split("-")[0]);
app.use(
  morgan("[:date[iso] #:id] Started :method :url for :remote-addr", {
    immediate: true,
  }),
);

app.use(
  morgan(
    "[:date[iso] #:id] Completed :status :res[content-length] in :response-time ms",
  ),
);

app.locals.appTitle = "Labortablo";
app.locals.API_BASE = config.get("baseUrl");

if (app.locals.API_BASE.endsWith("/")) app.locals.API_BASE += "api/";
else app.locals.API_BASE += "/api/";

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

crontasks.register(app);

app.listen(9080, "0.0.0.0", function (err) {
  if (err) {
    console.error("Error starting web application", err);
    process.exit(1);
  }

  console.log("Web listening on 0.0.0.0:9080");
});
