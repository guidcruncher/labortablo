const Handlebars = require("handlebars");
const config = require("config");

module.exports = {
  theme: function() {
    var result = "auto";
    if (config.has("theme.name")) {
      result = config.get("theme.name");
    }

    if (result == "schedule") {
      var s = config.get("theme.darkModeHours.start");
      var e = config.get("theme.darkModeHours.end");
      var curr = new Date();
      var start = new Date();
      var end = new Date();
      start.setHours(s);
      start.setMinutes(0);
      start.setSeconds(0);
      end.setHours(e);
      end.setMinutes(0);
      end.setSeconds(0);

      if (s > curr.getHours()) {
        start.setDate(start.getDate() - 1);
      }

      result = "light";

      if ((curr >= start) && (curr < end)) {
        result = "dark";
      }
    }

    return new Handlebars.SafeString(result);
  },
  nbsp: function(text) {
    if (text.trim() == "") {
      return new Handlebars.SafeString("&nbsp;");
    }
    return new Handlebars.SafeString(text);
  },
  statecss: function(state) {
    var css = "state ";

    switch (state) {
      case "healthy":
        css += " text-success";
        break
      case "running":
        css += " text-success";
        break
      case "unhealthy":
        css += " text-danger";
        break
      case "created":
        css += " text-info";
        break
      case "restarting":
        css += " text-warning";
        break
      case "paused":
        css += " text-secondary";
        break
      case "exited":
        css += " text-secondary";
        break
      case "dead":
        css += " text-black-50";
        break
    }
    return new Handlebars.SafeString(css);
  },
  configvalue: function(k, v) {
    var result = v;
    if (config.has(k)) {
      result = config.get(k);
    }
    return new Handlebars.SafeString(result);
  },
  eachwhen: function(list, k, v, opts) {
    var i,
      result = "";
    for (i = 0; i < list.length; ++i)
      if (list[i][k] == v) result = result + opts.fn(list[i]);
    return result;
  },
  lowercase: function(str) {
    if (str && typeof str === "string") {
      return new Handlebars.SafeString(str.toLowerCase());
    }
    return "";
  },
  ident: function(str) {
    if (str && typeof str === "string") {
      return new Handlebars.SafeString(str.toLowerCase().replace(" ", "-"));
    }
    return "";
  },
  hostonly: function(uri) {
    var parts = new URL(uri);
    return new Handlebars.SafeString(parts.protocol + "://" + parts.host);
  },
  domainonly: function(uri) {
    var parts = new URL(uri);
    return new Handlebars.SafeString(parts.hostname);
  },
  urlencode: function(v) {
    return new Handlebars.SafeString(encodeURIComponent(v));
  },
  debug: function(v) {
    return new Handlebars.SafeString(JSON.stringify(v, null, 2));
  },
};
