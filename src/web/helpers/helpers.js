const url = require("url");

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
      return str.toLowerCase();
    }
    return "";
  },
  ident: function (str) {
    if (str && typeof str === "string") {
      return str.toLowerCase().replace(" ", "-");
    }
    return "";
  },
  hostonly: function(uri) {
    var parts = new URL(uri);
    return parts.protocol + "://" + parts.host;
  },
  domainonly: function(uri) {
    var parts = new URL(uri);
    return parts.hostname;
  },
};
