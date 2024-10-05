module.exports = {
  eachwhen: function (list, k, v, opts) {
    var i,
      result = "";
    for (i = 0; i < list.length; ++i)
      if (list[i][k] == v) result = result + opts.fn(list[i]);
    return result;
  },
  lowercase: function (str) {
    if (str && typeof str === "string") {
      return new Handlebars.SafeString(str.toLowerCase());
    }
    return "";
  },
  ident: function (str) {
    if (str && typeof str === "string") {
      return new Handlebars.SafeString(str.toLowerCase().replace(" ", "-"));
    }
    return "";
  },
  hostonly: function (uri) {
    var parts = new URL(uri);
    return new Handlebars.SafeString(parts.protocol + "://" + parts.host);
  },
  domainonly: function (uri) {
    var parts = new URL(uri);
    return new Handlebars.SafeString(parts.hostname);
  },
  urlencode: function (v) {
    return new Handlebars.SafeString(encodeURIComponent(v));
  },
  debug: function (v) {
    return new Handlebars.SafeString(JSON.stringify(v, null, 2));
  },
  script: function(u) {
	if (process.env.NODE_ENV == "production") {
		return new Handlebars.SafeString("<script src=\" + u + ".min.js" + "\"></script>");
	}
	 return new Handlebars.SafeString("<script src=\" + u + ".js" + "\"></script>");
  }
};
