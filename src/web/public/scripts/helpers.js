Handlebars.registerHelper("eachwhen", function (list, k, v, opts) {
  var i,
    result = "";
  for (i = 0; i < list.length; ++i)
    if (list[i][k] == v) result = result + opts.fn(list[i]);
  return result;
});

Handlebars.registerHelper("lowercsse", function (str) {
  if (str && typeof str === "string") {
    return str.toLowerCase();
  }
  return "";
});

Handlebars.registerHelper("ident", function (str) {
  if (str && typeof str === "string") {
    return str.toLowerCase().replace(" ", "-");
  }
  return "";
});
