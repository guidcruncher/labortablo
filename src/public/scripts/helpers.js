Handlebars.registerHelper("eachwhen", function (list, k, v, opts) {
  var i,
    result = "";
  for (i = 0; i < list.length; ++i)
    if (list[i][k] == v) result = result + opts.fn(list[i]);
  return result;
});

Handlebars.registerHelper("lowercsse", function (str) {
  if (str && typeof str === "string") {
    return new Handlebars.SafeString(str.toLowerCase());
  }
  return "";
});

Handlebars.registerHelper("ident", function (str) {
  if (str && typeof str === "string") {
    return new Handlebars.SafeString(str.toLowerCase().replace(" ", "-"));
  }
  return "";
});

Handlebars.registerHelper("hostonly", function (uri) {
  var parts = new URL(uri);
  return new Handlebars.SafeString(parts.protocol + "://" + parts.host);
});

Handlebars.registerHelper("domainonly", function (uri) {
  var parts = new URL(uri);
  return new Handlebars.SafeString(parts.hostname);
});

Handlebars.registerHelper("urlencode", function (v) {
  return new Handlebars.SafeString(encodeURIComponent(v));
});

Handlebars.registerHelper("debug", function (v) {
  return new Handlebars.SafeString(JSON.stringify(v, null, 2));
});

