Handlebars.registerHelper("nbsp", function(text) {
  if (text.trim() == "") {
    return new Handlebars.SafeString("&nbsp;");
  }
  return new Handlebars.SafeString(text);
});

Handlebars.registerHelper('i18n',
  function(str){
    return new Handlebars.SafeString((typeof(i18n) !== "undefined" ? i18n.apply(null, arguments) : str));
  }
);

Handlebars.registerHelper("statecss", function(state) {
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
});

Handlebars.registerHelper("eachwhen", function(list, k, v, opts) {
  var i,
    result = "";
  for (i = 0; i < list.length; ++i)
    if (list[i][k] == v) result = result + opts.fn(list[i]);
  return result;
});

Handlebars.registerHelper("lowercsse", function(str) {
  if (str && typeof str === "string") {
    return new Handlebars.SafeString(str.toLowerCase());
  }
  return "";
});

Handlebars.registerHelper("ident", function(str) {
  if (str && typeof str === "string") {
    return new Handlebars.SafeString(str.toLowerCase().replace(" ", "-"));
  }
  return "";
});

Handlebars.registerHelper("hostonly", function(uri) {
  var parts = new URL(uri);
  return new Handlebars.SafeString(parts.protocol + "://" + parts.host);
});

Handlebars.registerHelper("domainonly", function(uri) {
  var parts = new URL(uri);
  return new Handlebars.SafeString(parts.hostname);
});

Handlebars.registerHelper("urlencode", function(v) {
  return new Handlebars.SafeString(encodeURIComponent(v));
});

Handlebars.registerHelper("debug", function(v) {
  return new Handlebars.SafeString(JSON.stringify(v, null, 2));
});
