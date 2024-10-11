this["JST"] = this["JST"] || {};

this["JST"]["views/error.hbs"] = Handlebars.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function(container, depth0, helpers, partials, data) {
    var stack1, helper, alias1 = container.escapeExpression,
      alias2 = container.lambda,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "<h1>" +
      alias1(((helper = (helper = lookupProperty(helpers, "message") || (depth0 != null ? lookupProperty(depth0, "message") : depth0)) != null ? helper : container.hooks.helperMissing), (typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}), {
        "name": "message",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 4
          },
          "end": {
            "line": 1,
            "column": 15
          }
        }
      }) : helper))) +
      "</h1>\n<h2>" +
      alias1(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0, "error") : depth0)) != null ? lookupProperty(stack1, "status") : stack1), depth0)) +
      "</h2>\n<pre>" +
      alias1(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0, "error") : depth0)) != null ? lookupProperty(stack1, "stack") : stack1), depth0)) +
      "</pre>\n";
  },
  "useData": true
});

this["JST"]["views/index.hbs"] = Handlebars.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function(container, depth0, helpers, partials, data) {
    var stack1, helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
      alias2 = container.hooks.helperMissing,
      alias3 = "function",
      alias4 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "<ul class=\"icon-left nav nav-tabs nav-justified\" role=\"tablist\">\n  <li class=\"nav-item\" role=\"presentation\">\n    <button class=\"nav-link active\" data-bs-toggle=\"tab\" role=\"tab\" data-bs-target=\"#tabservices\">\n      <i class=\"bi bi-server m-1\"></i> Services\n    </button>\n  </li>\n  <li class=\"nav-item\" role=\"presentation\">\n    <button class=\"nav-link\" data-bs-toggle=\"tab\" role=\"tab\" data-bs-target=\"#tabbookmarks\">\n      <i class=\"bi bi-pc-display-horizontal m-1\"></i> Bookmarks\n    </button>\n  </li>\n  <li class=\"nav-item\" role=\"presentation\">\n    <button class=\"nav-link\" data-bs-toggle=\"tab\" role=\"tab\" data-bs-target=\"#tabfeeds\">\n      <i class=\"bi bi-rss m-1\"></i> Feeds\n    </button>\n  </li>\n  <li class=\"nav-item\" role=\"presentation\">\n    <button class=\"nav-link\" data-bs-toggle=\"tab\" role=\"tab\" data-bs-target=\"#tabsystem\">\n      <i class=\"bi bi-clipboard-data m-1\"></i> System\n    </button>\n  </li>\n</ul>\n<div class=\"tab-content \">\n  <div class=\"tab-pane container-fluid active \" role=\"tabpanel\" id=\"tabservices\">\n" +
      ((stack1 = container.invokePartial(lookupProperty(partials, "iconlist"), (depth0 != null ? lookupProperty(depth0, "containers") : depth0), {
        "name": "iconlist",
        "data": data,
        "indent": "    ",
        "helpers": helpers,
        "partials": partials,
        "decorators": container.decorators
      })) != null ? stack1 : "") +
      "  </div>\n  <div class=\"tab-pane container-fluid fade \" role=\"tabpanel\" id=\"tabbookmarks\">\n" +
      ((stack1 = container.invokePartial(lookupProperty(partials, "bookmarks"), (depth0 != null ? lookupProperty(depth0, "bookmarks") : depth0), {
        "name": "bookmarks",
        "data": data,
        "indent": "    ",
        "helpers": helpers,
        "partials": partials,
        "decorators": container.decorators
      })) != null ? stack1 : "") +
      "  </div>\n  <div class=\"tab-pane container-fluid fade \" role=\"tabpanel\" id=\"tabfeeds\">\n" +
      ((stack1 = container.invokePartial(lookupProperty(partials, "feeds"), (depth0 != null ? lookupProperty(depth0, "newsfeeds") : depth0), {
        "name": "feeds",
        "data": data,
        "indent": "    ",
        "helpers": helpers,
        "partials": partials,
        "decorators": container.decorators
      })) != null ? stack1 : "") +
      "  </div>\n  <div class=\"tab-pane container-fluid fade \" role=\"tabpanel\" id=\"tabsystem\">\n" +
      ((stack1 = container.invokePartial(lookupProperty(partials, "system"), (depth0 != null ? lookupProperty(depth0, "systeminfo") : depth0), {
        "name": "system",
        "data": data,
        "indent": "    ",
        "helpers": helpers,
        "partials": partials,
        "decorators": container.decorators
      })) != null ? stack1 : "") +
      "  </div>\n</div>\n<script type=\"text/javascript\">\n  $(function () {\n    $('*[data-bs-toggle=\"tab\"]').click(function (e) {\n      window.API_BASE = '" +
      alias4(((helper = (helper = lookupProperty(helpers, "API_BASE") || (depth0 != null ? lookupProperty(depth0, "API_BASE") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "API_BASE",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 40,
            "column": 25
          },
          "end": {
            "line": 40,
            "column": 37
          }
        }
      }) : helper))) +
      "';\n      var target = $(this).attr(\"data-bs-target\");\n      switch (target) {\n      case \"#tabservices\":\n        reloadIconList();\n        break;\n      case \"#tabbookmarks\":\n        reloadBookmarks();\n        break;\n      case \"#tabfeeds\":\n        loadFeeds();\n        break;\n      case \"#tabsystem\":\n        reloadSystem();\n        break;\n      }\n      return false;\n    });\n    window.API_BASE = '" +
      alias4(((helper = (helper = lookupProperty(helpers, "API_BASE") || (depth0 != null ? lookupProperty(depth0, "API_BASE") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "API_BASE",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 58,
            "column": 23
          },
          "end": {
            "line": 58,
            "column": 35
          }
        }
      }) : helper))) +
      "';\n    $('.nav-tabs').materialtab();\n    setTimeout(reloadIconList, 60000);\n    setTimeout(reloadBookmarks, 120000);\n    setTimeout(loadFeeds, 60000);\n    setTimeout(reloadSystem, 15000);\n    containerStats();\n  });\n\n</script>\n";
  },
  "usePartial": true,
  "useData": true
});

this["JST"]["views/layouts/material-layout.hbs"] = Handlebars.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function(container, depth0, helpers, partials, data) {
    var stack1, helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
      alias2 = container.hooks.helperMissing,
      alias3 = "function",
      alias4 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "<!DOCTYPE html>\n<html data-bs-theme=\"" +
      alias4(((helper = (helper = lookupProperty(helpers, "theme") || (depth0 != null ? lookupProperty(depth0, "theme") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "theme",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 2,
            "column": 21
          },
          "end": {
            "line": 2,
            "column": 30
          }
        }
      }) : helper))) +
      "\">\n\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n  <script type=\"text/javascript\" src=\"/scripts/main.min.js\"></script>\n  <script type=\"text/javascript\">\n    window.API_BASE = '" +
      alias4(((helper = (helper = lookupProperty(helpers, "API_BASE") || (depth0 != null ? lookupProperty(depth0, "API_BASE") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "API_BASE",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 9,
            "column": 23
          },
          "end": {
            "line": 9,
            "column": 35
          }
        }
      }) : helper))) +
      "';\n\n  </script>\n  <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/@materialstyle/materialstyle@3.1.1/dist/css/materialstyle.min.css\">\n  <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css\">\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link href=\"https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap\" rel=\"stylesheet\">\n  <link rel=\"stylesheet\" href=\"/stylesheets/style.css\">\n  <link rel=\"shortcut icon\" href=\"/favicon.ico\" type=\"image/x-icon\" />\n  <link rel=\"icon\" href=\"/images/labortablo.svg\" type=\"image/svg+xml\" />\n  <link rel=\"icon\" href=\"/images/apple-touch-icon.png\" type=\"image/png\" />\n  <link rel=\"apple-touch-icon\" href=\"/images/apple-touch-icon.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"57x57\" href=\"/images/apple-touch-icon-57x57.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"72x72\" href=\"/images/apple-touch-icon-72x72.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"76x76\" href=\"/images/apple-touch-icon-76x76.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"114x114\" href=\"/images/apple-touch-icon-114x114.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"120x120\" href=\"/images/apple-touch-icon-120x120.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"144x144\" href=\"/images/apple-touch-icon-144x144.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"152x152\" href=\"/images/apple-touch-icon-152x152.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/images/apple-touch-icon-180x180.png\" />\n  <title>" +
      alias4(((helper = (helper = lookupProperty(helpers, "appTitle") || (depth0 != null ? lookupProperty(depth0, "appTitle") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "appTitle",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 30,
            "column": 9
          },
          "end": {
            "line": 30,
            "column": 21
          }
        }
      }) : helper))) +
      " - " +
      alias4(((helper = (helper = lookupProperty(helpers, "title") || (depth0 != null ? lookupProperty(depth0, "title") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "title",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 30,
            "column": 24
          },
          "end": {
            "line": 30,
            "column": 33
          }
        }
      }) : helper))) +
      "</title>\n</head>\n\n<body class=\"roboto-flex-main\">\n  <nav class=\"navbar navbar-expand-sm bg-primary navbar-dark fixed-top\">\n    <div class=\"container-fluid\">\n      <a class=\"navbar-brand d-flex align-items-center\" href=\"javascript:\">\n        <i><img style=\"height:30px;\" src=\"/images/logo.svg\" /></i>&nbsp;" +
      alias4(((helper = (helper = lookupProperty(helpers, "appTitle") || (depth0 != null ? lookupProperty(depth0, "appTitle") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "appTitle",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 37,
            "column": 72
          },
          "end": {
            "line": 37,
            "column": 84
          }
        }
      }) : helper))) +
      "\n      </a>\n      <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n      </button>\n      <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n        <ul class=\"navbar-nav me-auto mb-2 mb-lg-0\">\n          <li class=\"nav-item\">\n            <a class=\"nav-link active\" aria-current=\"page\" href=\"/\">Home</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n    </div>\n  </nav>\n  <div style=\"margin-top: 70px;\"></div>\n  <div class=\"container\">\n    " +
      ((stack1 = ((helper = (helper = lookupProperty(helpers, "body") || (depth0 != null ? lookupProperty(depth0, "body") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "body",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 54,
            "column": 4
          },
          "end": {
            "line": 54,
            "column": 14
          }
        }
      }) : helper))) != null ? stack1 : "") +
      "\n  </div>\n  <div style=\"margin-top: 70px;\"></div>\n  <footer class=\"bg-dark text-white p-3 fixed-bottom\">\n" +
      ((stack1 = container.invokePartial(lookupProperty(partials, "ticker"), depth0, {
        "name": "ticker",
        "data": data,
        "indent": "    ",
        "helpers": helpers,
        "partials": partials,
        "decorators": container.decorators
      })) != null ? stack1 : "") +
      "  </footer>\n\n  <script type=\"text/javascript\">\n    applyTheme('" +
      alias4(((helper = (helper = lookupProperty(helpers, "THEME_NAME") || (depth0 != null ? lookupProperty(depth0, "THEME_NAME") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "THEME_NAME",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 62,
            "column": 16
          },
          "end": {
            "line": 62,
            "column": 30
          }
        }
      }) : helper))) +
      "', " +
      alias4(((helper = (helper = lookupProperty(helpers, "THEME_START") || (depth0 != null ? lookupProperty(depth0, "THEME_START") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "THEME_START",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 62,
            "column": 33
          },
          "end": {
            "line": 62,
            "column": 48
          }
        }
      }) : helper))) +
      ", " +
      alias4(((helper = (helper = lookupProperty(helpers, "THEME_END") || (depth0 != null ? lookupProperty(depth0, "THEME_END") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "THEME_END",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 62,
            "column": 50
          },
          "end": {
            "line": 62,
            "column": 63
          }
        }
      }) : helper))) +
      ");\n\n  </script>\n</body>\n\n</html>\n";
  },
  "usePartial": true,
  "useData": true
});

this["JST"]["views/layouts/material-setup.hbs"] = Handlebars.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function(container, depth0, helpers, partials, data) {
    var stack1, helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
      alias2 = container.hooks.helperMissing,
      alias3 = "function",
      alias4 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "<!DOCTYPE html>\n<html data-bs-theme=\"" +
      alias4(((helper = (helper = lookupProperty(helpers, "theme") || (depth0 != null ? lookupProperty(depth0, "theme") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "theme",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 2,
            "column": 21
          },
          "end": {
            "line": 2,
            "column": 30
          }
        }
      }) : helper))) +
      "\">\n\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n  <script type=\"text/javascript\" src=\"/scripts/main.min.js\"></script>\n  <script type=\"text/javascript\">\n    window.API_BASE = '" +
      alias4(((helper = (helper = lookupProperty(helpers, "API_BASE") || (depth0 != null ? lookupProperty(depth0, "API_BASE") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "API_BASE",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 9,
            "column": 23
          },
          "end": {
            "line": 9,
            "column": 35
          }
        }
      }) : helper))) +
      "';\n\n  </script>\n  <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/@materialstyle/materialstyle@3.1.1/dist/css/materialstyle.min.css\">\n  <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css\">\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link href=\"https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap\" rel=\"stylesheet\">\n  <link rel=\"stylesheet\" href=\"/stylesheets/style.css\">\n  <link rel=\"shortcut icon\" href=\"/favicon.ico\" type=\"image/x-icon\" />\n  <link rel=\"icon\" href=\"/images/labortablo.svg\" type=\"image/svg+xml\" />\n  <link rel=\"icon\" href=\"/images/apple-touch-icon.png\" type=\"image/png\" />\n  <link rel=\"apple-touch-icon\" href=\"/images/apple-touch-icon.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"57x57\" href=\"/images/apple-touch-icon-57x57.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"72x72\" href=\"/images/apple-touch-icon-72x72.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"76x76\" href=\"/images/apple-touch-icon-76x76.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"114x114\" href=\"/images/apple-touch-icon-114x114.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"120x120\" href=\"/images/apple-touch-icon-120x120.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"144x144\" href=\"/images/apple-touch-icon-144x144.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"152x152\" href=\"/images/apple-touch-icon-152x152.png\" />\n  <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/images/apple-touch-icon-180x180.png\" />\n  <title>" +
      alias4(((helper = (helper = lookupProperty(helpers, "title") || (depth0 != null ? lookupProperty(depth0, "title") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "title",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 30,
            "column": 9
          },
          "end": {
            "line": 30,
            "column": 18
          }
        }
      }) : helper))) +
      "</title>\n</head>\n\n<body class=\"roboto-flex-main\">\n  <div class=\"container\">\n    " +
      ((stack1 = ((helper = (helper = lookupProperty(helpers, "body") || (depth0 != null ? lookupProperty(depth0, "body") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "body",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 35,
            "column": 4
          },
          "end": {
            "line": 35,
            "column": 14
          }
        }
      }) : helper))) != null ? stack1 : "") +
      "\n  </div>\n  <script type=\"text/javascript\">\n    applyTheme('" +
      alias4(((helper = (helper = lookupProperty(helpers, "THEME_NAME") || (depth0 != null ? lookupProperty(depth0, "THEME_NAME") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "THEME_NAME",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 38,
            "column": 16
          },
          "end": {
            "line": 38,
            "column": 30
          }
        }
      }) : helper))) +
      "', " +
      alias4(((helper = (helper = lookupProperty(helpers, "THEME_START") || (depth0 != null ? lookupProperty(depth0, "THEME_START") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "THEME_START",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 38,
            "column": 33
          },
          "end": {
            "line": 38,
            "column": 48
          }
        }
      }) : helper))) +
      ", " +
      alias4(((helper = (helper = lookupProperty(helpers, "THEME_END") || (depth0 != null ? lookupProperty(depth0, "THEME_END") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "THEME_END",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 38,
            "column": 50
          },
          "end": {
            "line": 38,
            "column": 63
          }
        }
      }) : helper))) +
      ");\n\n  </script>\n</body>\n\n</html>\n";
  },
  "useData": true
});

this["JST"]["views/partials/bookmarks.hbs"] = Handlebars.template({
  "1": function(container, depth0, helpers, partials, data) {
    var stack1, helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "    <div class=\"list-group-item list-group-item-primary\">" +
      container.escapeExpression(((helper = (helper = lookupProperty(helpers, "key") || (data && lookupProperty(data, "key"))) != null ? helper : container.hooks.helperMissing), (typeof helper === "function" ? helper.call(alias1, {
        "name": "key",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 3,
            "column": 57
          },
          "end": {
            "line": 3,
            "column": 65
          }
        }
      }) : helper))) +
      "</div>\n" +
      ((stack1 = lookupProperty(helpers, "each").call(alias1, depth0, {
        "name": "each",
        "hash": {},
        "fn": container.program(2, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 4,
            "column": 4
          },
          "end": {
            "line": 12,
            "column": 13
          }
        }
      })) != null ? stack1 : "") +
      " " +
      ((stack1 = lookupProperty(helpers, "if").call(alias1, (data && lookupProperty(data, "last")), {
        "name": "if",
        "hash": {},
        "fn": container.program(7, data, 0),
        "inverse": container.program(9, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 12,
            "column": 14
          },
          "end": {
            "line": 14,
            "column": 11
          }
        }
      })) != null ? stack1 : "");
  },
  "2": function(container, depth0, helpers, partials, data) {
    var stack1, helper, alias1 = container.lambda,
      alias2 = container.escapeExpression,
      alias3 = depth0 != null ? depth0 : (container.nullContext || {}),
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "      <a href=\"" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "href") : depth0), depth0)) +
      "\" target=\"_blank\" class=\"list-group-item d-flex align-items-center gap-3 list-group-item-action\">\n        <span style=\"width:36px\"><img src=\"" +
      ((stack1 = lookupProperty(helpers, "if").call(alias3, (depth0 != null ? lookupProperty(depth0, "icon") : depth0), {
        "name": "if",
        "hash": {},
        "fn": container.program(3, data, 0),
        "inverse": container.program(5, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 6,
            "column": 43
          },
          "end": {
            "line": 6,
            "column": 163
          }
        }
      })) != null ? stack1 : "") +
      "\" style=\"max-width:32px;max-height:32px;\" /></span>\n        <span>\n          " +
      alias2(((helper = (helper = lookupProperty(helpers, "key") || (data && lookupProperty(data, "key"))) != null ? helper : container.hooks.helperMissing), (typeof helper === "function" ? helper.call(alias3, {
        "name": "key",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 8,
            "column": 10
          },
          "end": {
            "line": 8,
            "column": 18
          }
        }
      }) : helper))) +
      "\n          <div style=\"font-size: 12px;white-space:nowrap;overflow:hidden; !important;width:280px !important;\" class=\"d-block text-muted\">" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "description") : depth0), depth0)) +
      "</div>\n        </span>\n      </a>\n    ";
  },
  "3": function(container, depth0, helpers, partials, data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return "/user-icons/" +
      container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0, "icon") : depth0), depth0));
  },
  "5": function(container, depth0, helpers, partials, data) {
    var stack1, alias1 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return alias1(container.lambda(((stack1 = (data && lookupProperty(data, "root"))) && lookupProperty(stack1, "API_BASE")), depth0)) +
      "/bookmarks/icon?host=" +
      alias1((lookupProperty(helpers, "domainonly") || (depth0 && lookupProperty(depth0, "domainonly")) || container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}), (depth0 != null ? lookupProperty(depth0, "href") : depth0), {
        "name": "domainonly",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 6,
            "column": 132
          },
          "end": {
            "line": 6,
            "column": 156
          }
        }
      }));
  },
  "7": function(container, depth0, helpers, partials, data) {
    return "";
  },
  "9": function(container, depth0, helpers, partials, data) {
    return "\n      <div class=\"list-group-item list-divider\"></div>\n";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return "<div class=\"list-group\">\n" +
      ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : (container.nullContext || {}), depth0, {
        "name": "each",
        "hash": {},
        "fn": container.program(1, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 2,
            "column": 2
          },
          "end": {
            "line": 15,
            "column": 11
          }
        }
      })) != null ? stack1 : "") +
      "</div>\n";
  },
  "useData": true
});

this["JST"]["views/partials/feeds.hbs"] = Handlebars.template({
  "1": function(container, depth0, helpers, partials, data) {
    var stack1, helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
      alias2 = container.hooks.helperMissing,
      alias3 = "function",
      alias4 = container.escapeExpression,
      alias5 = container.lambda,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "    <li class=\"list-group-item list-group-item-primary\">\n      <div onclick=\"window.open('" +
      alias4(((helper = (helper = lookupProperty(helpers, "link") || (depth0 != null ? lookupProperty(depth0, "link") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "link",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 4,
            "column": 33
          },
          "end": {
            "line": 4,
            "column": 41
          }
        }
      }) : helper))) +
      "'); return false;\" class=\"container primary\">\n        <div class=\"row\">\n          <div class=\"col-2 mobile-hide\"><img style=\"max-height:80px;\" src=\"" +
      alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0, "image") : depth0)) != null ? lookupProperty(stack1, "url") : stack1), depth0)) +
      "\" alt=\"" +
      alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0, "image") : depth0)) != null ? lookupProperty(stack1, "title") : stack1), depth0)) +
      "\" /></div>\n          <div class=\"col-10 d-flex align-items-center\">\n            <div class=\"container\">\n              <div class=\"row\">\n                <div class=\"col\">\n                  <span class=\"align-middle\">\n                    <h2>" +
      alias4(((helper = (helper = lookupProperty(helpers, "title") || (depth0 != null ? lookupProperty(depth0, "title") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "title",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 12,
            "column": 24
          },
          "end": {
            "line": 12,
            "column": 33
          }
        }
      }) : helper))) +
      "</h2>\n                  </span>\n                </div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col\">\n                  <span><i>" +
      alias4(((helper = (helper = lookupProperty(helpers, "lastBuildDate") || (depth0 != null ? lookupProperty(depth0, "lastBuildDate") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "lastBuildDate",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 18,
            "column": 27
          },
          "end": {
            "line": 18,
            "column": 44
          }
        }
      }) : helper))) +
      "</i></span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </li>\n" +
      ((stack1 = lookupProperty(helpers, "each").call(alias1, (depth0 != null ? lookupProperty(depth0, "items") : depth0), {
        "name": "each",
        "hash": {},
        "fn": container.program(2, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 26,
            "column": 4
          },
          "end": {
            "line": 33,
            "column": 13
          }
        }
      })) != null ? stack1 : "");
  },
  "2": function(container, depth0, helpers, partials, data) {
    var stack1, helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
      alias2 = container.hooks.helperMissing,
      alias3 = "function",
      alias4 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "      <li class=\"list-group-item\" onclick=\"window.open('" +
      alias4(((helper = (helper = lookupProperty(helpers, "link") || (depth0 != null ? lookupProperty(depth0, "link") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "link",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 27,
            "column": 56
          },
          "end": {
            "line": 27,
            "column": 64
          }
        }
      }) : helper))) +
      "'); return false;\">\n        <h2>" +
      alias4(((helper = (helper = lookupProperty(helpers, "title") || (depth0 != null ? lookupProperty(depth0, "title") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "title",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 28,
            "column": 12
          },
          "end": {
            "line": 28,
            "column": 21
          }
        }
      }) : helper))) +
      "</h2>\n        <small class=\"d-block text-muted\">" +
      alias4(((helper = (helper = lookupProperty(helpers, "pubDate") || (depth0 != null ? lookupProperty(depth0, "pubDate") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "pubDate",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 29,
            "column": 42
          },
          "end": {
            "line": 29,
            "column": 53
          }
        }
      }) : helper))) +
      "</small>\n        <img src=\"" +
      alias4(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0, "enclosure") : depth0)) != null ? lookupProperty(stack1, "url") : stack1), depth0)) +
      "\" style=\"float:left; max-width:100px;margin-right: 10px;\" /> " +
      alias4(((helper = (helper = lookupProperty(helpers, "content") || (depth0 != null ? lookupProperty(depth0, "content") : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {
        "name": "content",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 30,
            "column": 96
          },
          "end": {
            "line": 30,
            "column": 107
          }
        }
      }) : helper))) +
      "\n      </li>\n      <li class=\"list-group-item list-divider\"></li>\n";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return "<ul class=\"list-group\">\n" +
      ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : (container.nullContext || {}), depth0, {
        "name": "each",
        "hash": {},
        "fn": container.program(1, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 2,
            "column": 2
          },
          "end": {
            "line": 34,
            "column": 11
          }
        }
      })) != null ? stack1 : "") +
      "</ul>\n";
  },
  "useData": true
});

this["JST"]["views/partials/iconbutton.hbs"] = Handlebars.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function(container, depth0, helpers, partials, data) {
    var alias1 = container.escapeExpression,
      alias2 = container.lambda,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "<button id=\"btn-" +
      alias1((lookupProperty(helpers, "ident") || (depth0 && lookupProperty(depth0, "ident")) || container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}), (depth0 != null ? lookupProperty(depth0, "name") : depth0), {
        "name": "ident",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 16
          },
          "end": {
            "line": 1,
            "column": 35
          }
        }
      })) +
      "\" type=\"button\" class=\"btn btn-outline-secondary\" style=\"margin:5px;\" onClick=\"window.open('" +
      alias1(alias2((depth0 != null ? lookupProperty(depth0, "href") : depth0), depth0)) +
      "', '_blank')\" style=\"max-heightL80px\">\n  <img src=\"" +
      alias1(alias2((depth0 != null ? lookupProperty(depth0, "icon") : depth0), depth0)) +
      "\" style=\"max-width:64px;max-height:64px\" />\n  <br />\n  <div>" +
      alias1(alias2((depth0 != null ? lookupProperty(depth0, "name") : depth0), depth0)) +
      "</div>\n</button>\n";
  },
  "useData": true
});

this["JST"]["views/partials/iconcards.hbs"] = Handlebars.template({
  "1": function(container, depth0, helpers, partials, data, blockParams, depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return " " +
      ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : (container.nullContext || {}), (depth0 != null ? lookupProperty(depth0, "groups") : depth0), {
        "name": "each",
        "hash": {},
        "fn": container.program(2, data, 0, blockParams, depths),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 20
          },
          "end": {
            "line": 7,
            "column": 11
          }
        }
      })) != null ? stack1 : "");
  },
  "2": function(container, depth0, helpers, partials, data, blockParams, depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return "\n    <div class=\"card\" style=\"margin-bottom:5px\">\n      <div class=\"card-body\">\n        <h5 class=\"card-title\">" +
      container.escapeExpression(container.lambda(depth0, depth0)) +
      "</h5> " +
      ((stack1 = (lookupProperty(helpers, "eachwhen") || (depth0 && lookupProperty(depth0, "eachwhen")) || container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}), (depths[1] != null ? lookupProperty(depths[1], "items") : depths[1]), "group", depth0, {
        "name": "eachwhen",
        "hash": {},
        "fn": container.program(3, data, 0, blockParams, depths),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 4,
            "column": 45
          },
          "end": {
            "line": 4,
            "column": 122
          }
        }
      })) != null ? stack1 : "") +
      "\n      </div>\n    </div>\n";
  },
  "3": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return " " +
      ((stack1 = container.invokePartial(lookupProperty(partials, "iconbutton"), depth0, {
        "name": "iconbutton",
        "data": data,
        "helpers": helpers,
        "partials": partials,
        "decorators": container.decorators
      })) != null ? stack1 : "") +
      " ";
  },
  "5": function(container, depth0, helpers, partials, data, blockParams, depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return " " +
      ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : (container.nullContext || {}), (depth0 != null ? lookupProperty(depth0, "groups") : depth0), {
        "name": "each",
        "hash": {},
        "fn": container.program(6, data, 0, blockParams, depths),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 8,
            "column": 9
          },
          "end": {
            "line": 17,
            "column": 13
          }
        }
      })) != null ? stack1 : "") +
      " ";
  },
  "6": function(container, depth0, helpers, partials, data, blockParams, depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return "\n    <div class=\"card border border-primary\" style=\"max-width:400px\">\n      <div class=\"card-body\">\n        <h4 class=\"card-title text-primary\">" +
      container.escapeExpression(container.lambda(depth0, depth0)) +
      "</h4>\n        <p class=\"card-text\">\n          " +
      ((stack1 = (lookupProperty(helpers, "eachwhen") || (depth0 && lookupProperty(depth0, "eachwhen")) || container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}), (depths[1] != null ? lookupProperty(depths[1], "items") : depths[1]), "group", depth0, {
        "name": "eachwhen",
        "hash": {},
        "fn": container.program(3, data, 0, blockParams, depths),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 13,
            "column": 10
          },
          "end": {
            "line": 13,
            "column": 87
          }
        }
      })) != null ? stack1 : "") +
      "\n        </p>\n      </div>\n    </div>\n    ";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function(container, depth0, helpers, partials, data, blockParams, depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return ((stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : (container.nullContext || {}), (depth0 != null ? lookupProperty(depth0, "isBootstrap") : depth0), {
        "name": "if",
        "hash": {},
        "fn": container.program(1, data, 0, blockParams, depths),
        "inverse": container.program(5, data, 0, blockParams, depths),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 21
          }
        }
      })) != null ? stack1 : "") +
      "\n";
  },
  "usePartial": true,
  "useData": true,
  "useDepths": true
});

this["JST"]["views/partials/iconlist.hbs"] = Handlebars.template({
  "1": function(container, depth0, helpers, partials, data, blockParams, depths) {
    var stack1, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "    <div class=\"list-group-item list-group-item-primary\">" +
      container.escapeExpression(container.lambda(depth0, depth0)) +
      "</div>\n" +
      ((stack1 = (lookupProperty(helpers, "eachwhen") || (depth0 && lookupProperty(depth0, "eachwhen")) || container.hooks.helperMissing).call(alias1, (depths[1] != null ? lookupProperty(depths[1], "items") : depths[1]), "group", depth0, {
        "name": "eachwhen",
        "hash": {},
        "fn": container.program(2, data, 0, blockParams, depths),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 4,
            "column": 4
          },
          "end": {
            "line": 26,
            "column": 13
          }
        }
      })) != null ? stack1 : "") +
      " " +
      ((stack1 = lookupProperty(helpers, "if").call(alias1, (data && lookupProperty(data, "last")), {
        "name": "if",
        "hash": {},
        "fn": container.program(4, data, 0, blockParams, depths),
        "inverse": container.program(6, data, 0, blockParams, depths),
        "data": data,
        "loc": {
          "start": {
            "line": 26,
            "column": 14
          },
          "end": {
            "line": 28,
            "column": 7
          }
        }
      })) != null ? stack1 : "") +
      " ";
  },
  "2": function(container, depth0, helpers, partials, data) {
    var alias1 = container.lambda,
      alias2 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "      <div class=\"list-group-item d-flex align-items-center gap-3 list-group-item-action\" onclick=\"window.open('" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "href") : depth0), depth0)) +
      "','_blank');return false;\">\n        <div class=\"container\">\n          <div class=\"row\">\n            <div class=\"col\" style=\"width:36px !important;max-width:36px !important;height:40px !important;padding: 0px;\" />\n            <img src=\"" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "iconhref") : depth0), depth0)) +
      "\" style=\"align:middle;max-width:32px;height:32px;\" />\n          </div>\n          <div class=\"col\" style=\"overflow:hidden;\">\n            <div class=\"row\"><span>" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "name") : depth0), depth0)) +
      "</span></div>\n            <div class=\"row\">\n              <div class=\"col col-md-auto\" style=\"font-size: 12px;white-space:nowrap;overflow:hidden; !important;\">" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "description") : depth0), depth0)) +
      "</div>\n            </div>\n          </div>\n          <div class=\"col\">\n            <div class=\"containerstats mobile-hide\" container-id=\"" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "container") : depth0), depth0)) +
      "\">CPU: -</div>\n          </div>\n          <div class=\"col col-md-auto\">\n            <span class=\"state " +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "state") : depth0), depth0)) +
      "\">" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "state") : depth0), depth0)) +
      "</span>\n          </div>\n        </div>\n      </div>\n</div>\n";
  },
  "4": function(container, depth0, helpers, partials, data) {
    return "";
  },
  "6": function(container, depth0, helpers, partials, data) {
    return "\n  <div class=\"list-group-item list-divider\"></div>\n";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function(container, depth0, helpers, partials, data, blockParams, depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return "<div class=\"list-group\">\n" +
      ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : (container.nullContext || {}), (depth0 != null ? lookupProperty(depth0, "groups") : depth0), {
        "name": "each",
        "hash": {},
        "fn": container.program(1, data, 0, blockParams, depths),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 2,
            "column": 2
          },
          "end": {
            "line": 28,
            "column": 17
          }
        }
      })) != null ? stack1 : "") +
      "\n</div>\n";
  },
  "useData": true,
  "useDepths": true
});

this["JST"]["views/partials/icontabs.hbs"] = Handlebars.template({
  "1": function(container, depth0, helpers, partials, data, blockParams, depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return " " +
      ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : (container.nullContext || {}), (depth0 != null ? lookupProperty(depth0, "groups") : depth0), {
        "name": "each",
        "hash": {},
        "fn": container.program(2, data, 0, blockParams, depths),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 20
          },
          "end": {
            "line": 7,
            "column": 11
          }
        }
      })) != null ? stack1 : "");
  },
  "2": function(container, depth0, helpers, partials, data, blockParams, depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return "\n    <div class=\"card\" style=\"margin-bottom:5px\">\n      <div class=\"card-body\">\n        <h5 class=\"card-title\">" +
      container.escapeExpression(container.lambda(depth0, depth0)) +
      "</h5> " +
      ((stack1 = (lookupProperty(helpers, "eachwhen") || (depth0 && lookupProperty(depth0, "eachwhen")) || container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}), (depths[1] != null ? lookupProperty(depths[1], "items") : depths[1]), "group", depth0, {
        "name": "eachwhen",
        "hash": {},
        "fn": container.program(3, data, 0, blockParams, depths),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 4,
            "column": 45
          },
          "end": {
            "line": 4,
            "column": 122
          }
        }
      })) != null ? stack1 : "") +
      "\n      </div>\n    </div>\n";
  },
  "3": function(container, depth0, helpers, partials, data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return " " +
      ((stack1 = container.invokePartial(lookupProperty(partials, "iconbutton"), depth0, {
        "name": "iconbutton",
        "data": data,
        "helpers": helpers,
        "partials": partials,
        "decorators": container.decorators
      })) != null ? stack1 : "") +
      " ";
  },
  "5": function(container, depth0, helpers, partials, data, blockParams, depths) {
    var stack1, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "  <ul class=\"nav nav-tabs nav-justified\" role=\"tablist\">\n" +
      ((stack1 = lookupProperty(helpers, "each").call(alias1, (depth0 != null ? lookupProperty(depth0, "groups") : depth0), {
        "name": "each",
        "hash": {},
        "fn": container.program(6, data, 0, blockParams, depths),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 10,
            "column": 4
          },
          "end": {
            "line": 14,
            "column": 15
          }
        }
      })) != null ? stack1 : "") +
      "  </ul>\n  <div class=\"tab-content\">\n" +
      ((stack1 = lookupProperty(helpers, "each").call(alias1, (depth0 != null ? lookupProperty(depth0, "groups") : depth0), {
        "name": "each",
        "hash": {},
        "fn": container.program(9, data, 0, blockParams, depths),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 17,
            "column": 4
          },
          "end": {
            "line": 23,
            "column": 15
          }
        }
      })) != null ? stack1 : "");
  },
  "6": function(container, depth0, helpers, partials, data) {
    var stack1, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
      alias2 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "      <li class=\"nav-item\" role=\"presentation\">\n        <button class=\"nav-link " +
      ((stack1 = lookupProperty(helpers, "if").call(alias1, (data && lookupProperty(data, "first")), {
        "name": "if",
        "hash": {},
        "fn": container.program(7, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 12,
            "column": 32
          },
          "end": {
            "line": 12,
            "column": 59
          }
        }
      })) != null ? stack1 : "") +
      "\" data-bs-toggle=\"tab\" role=\"tab\" data-bs-target=\"#" +
      alias2((lookupProperty(helpers, "ident") || (depth0 && lookupProperty(depth0, "ident")) || container.hooks.helperMissing).call(alias1, depth0, {
        "name": "ident",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 12,
            "column": 110
          },
          "end": {
            "line": 12,
            "column": 124
          }
        }
      })) +
      "\">" +
      alias2(container.lambda(depth0, depth0)) +
      "</button>\n      </li>\n";
  },
  "7": function(container, depth0, helpers, partials, data) {
    return "active";
  },
  "9": function(container, depth0, helpers, partials, data, blockParams, depths) {
    var stack1, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
      alias2 = container.hooks.helperMissing,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "      <div class=\"tab-pane container-fluid " +
      ((stack1 = lookupProperty(helpers, "if").call(alias1, (data && lookupProperty(data, "first")), {
        "name": "if",
        "hash": {},
        "fn": container.program(7, data, 0, blockParams, depths),
        "inverse": container.program(10, data, 0, blockParams, depths),
        "data": data,
        "loc": {
          "start": {
            "line": 18,
            "column": 43
          },
          "end": {
            "line": 18,
            "column": 82
          }
        }
      })) != null ? stack1 : "") +
      "\" role=\"tabpanel\" id=\"" +
      container.escapeExpression((lookupProperty(helpers, "ident") || (depth0 && lookupProperty(depth0, "ident")) || alias2).call(alias1, depth0, {
        "name": "ident",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 18,
            "column": 104
          },
          "end": {
            "line": 18,
            "column": 118
          }
        }
      })) +
      "\">\n        <div style=\"margin:5px;\">\n          " +
      ((stack1 = (lookupProperty(helpers, "eachwhen") || (depth0 && lookupProperty(depth0, "eachwhen")) || alias2).call(alias1, (depths[1] != null ? lookupProperty(depths[1], "items") : depths[1]), "group", depth0, {
        "name": "eachwhen",
        "hash": {},
        "fn": container.program(3, data, 0, blockParams, depths),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 20,
            "column": 10
          },
          "end": {
            "line": 20,
            "column": 87
          }
        }
      })) != null ? stack1 : "") +
      "\n        </div>\n      </div>\n";
  },
  "10": function(container, depth0, helpers, partials, data) {
    return "fade";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function(container, depth0, helpers, partials, data, blockParams, depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return ((stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : (container.nullContext || {}), (depth0 != null ? lookupProperty(depth0, "isBootstrap") : depth0), {
      "name": "if",
      "hash": {},
      "fn": container.program(1, data, 0, blockParams, depths),
      "inverse": container.program(5, data, 0, blockParams, depths),
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 24,
          "column": 7
        }
      }
    })) != null ? stack1 : "");
  },
  "usePartial": true,
  "useData": true,
  "useDepths": true
});

this["JST"]["views/partials/system.hbs"] = Handlebars.template({
  "1": function(container, depth0, helpers, partials, data) {
    var stack1, alias1 = container.lambda,
      alias2 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "                <tr>\n                  <th scope=\"row\">Device</th>\n                  <td>" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "fs") : depth0), depth0)) +
      "</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Capacity</th>\n                  <td>" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "strsize") : depth0), depth0)) +
      "</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Used</th>\n                  <td>" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "strused") : depth0), depth0)) +
      " (" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "use") : depth0), depth0)) +
      "%)</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Free</th>\n                  <td>" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "stravailable") : depth0), depth0)) +
      "</t>\n                </tr>\n                " +
      ((stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : (container.nullContext || {}), (data && lookupProperty(data, "last")), {
        "name": "if",
        "hash": {},
        "fn": container.program(2, data, 0),
        "inverse": container.program(4, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 118,
            "column": 16
          },
          "end": {
            "line": 123,
            "column": 23
          }
        }
      })) != null ? stack1 : "") +
      " ";
  },
  "2": function(container, depth0, helpers, partials, data) {
    return "";
  },
  "4": function(container, depth0, helpers, partials, data) {
    return "\n                  <tr>\n                    <th scope=\"row\">&nbsp;</th>\n                    <td>&nbsp;</td>\n                  </tr>\n                ";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function(container, depth0, helpers, partials, data) {
    var stack1, alias1 = container.lambda,
      alias2 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card m-3 border border-primary\" style=\"max-width:400px\">\n        <img class=\"card-img-top\" style=\"margin:10px;max-height:100px;max-width:380px;\" src=\"/api/icons/simple?name=" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "system") : depth0)) != null ? lookupProperty(stack1, "manufacturer") : stack1), depth0)) +
      "\" alt=\"\">\n        <div class=\"card-body\">\n          <h4 class=\"card-title text-primary\">" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "system") : depth0)) != null ? lookupProperty(stack1, "model") : stack1), depth0)) +
      "</h4>\n          <p class=\"card-text\">\n          <table class=\"table table-hover\">\n            <tbody>\n              <tr>\n                <th scope=\"row\">Manufacturer</th>\n                <td>" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "system") : depth0)) != null ? lookupProperty(stack1, "manufacturer") : stack1), depth0)) +
      "</td>\n              </tr>\n              <tr>\n                <th scope=\"row\">CPU</th>\n                <td>" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "cpu") : depth0)) != null ? lookupProperty(stack1, "manufacturer") : stack1), depth0)) +
      " " +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "cpu") : depth0)) != null ? lookupProperty(stack1, "brand") : stack1), depth0)) +
      "</td>\n              </tr>\n              <tr>\n                <th scope=\"row\">Vendor</th>\n                <td>" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "cpu") : depth0)) != null ? lookupProperty(stack1, "vendor") : stack1), depth0)) +
      "</td>\n              </tr>\n            </tbody>\n          </table>\n          </p>\n        </div>\n      </div>\n    </div>\n    <div class=\"col\">\n      <div class=\"card m-3 border border-primary\" style=\"max-width:400px\">\n        <img class=\"card-img-top\" style=\"margin:10px;max-height:100px;max-width:380px\" src=\"/api/icons/simple?name=" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "cpu") : depth0)) != null ? lookupProperty(stack1, "vendor") : stack1), depth0)) +
      "\" alt=\"\">\n        <div class=\"card-body\">\n          <h4 class=\"card-title text-primary\">Processor</h4>\n          <p class=\"card-text\">\n          <table class=\"table table-hover\">\n            <tbody>\n              <tr>\n                <th scope=\"row\">CPU</th>\n                <td>" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "cpu") : depth0)) != null ? lookupProperty(stack1, "vendor") : stack1), depth0)) +
      " " +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "cpu") : depth0)) != null ? lookupProperty(stack1, "family") : stack1), depth0)) +
      "</td>\n              </tr>\n              <tr>\n                <th scope=\"row\">Avg Speed</th>\n                <td>" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "cpuCurrentSpeed") : depth0)) != null ? lookupProperty(stack1, "avg") : stack1), depth0)) +
      "ghz</td>\n              </tr>\n              <tr>\n                <th scope=\"row\">Temperature</th>\n                <td>" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "cpuTemperature") : depth0)) != null ? lookupProperty(stack1, "main") : stack1), depth0)) +
      "&#8451;</td>\n              </tr>\n            </tbody>\n          </table>\n          </p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card m-3 border border-primary\" style=\"max-width:400px\">\n        <div class=\"card-body\">\n          <h4 class=\"card-title text-primary\">Memory</h4>\n          <p class=\"card-text\">\n          <table class=\"table table-hover\">\n            <tbody>\n              <tr>\n                <th scope=\"row\">Capacity</th>\n                <td>" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "mem") : depth0)) != null ? lookupProperty(stack1, "strtotal") : stack1), depth0)) +
      "</td>\n              </tr>\n              <tr>\n                <th scope=\"row\">Used</th>\n                <td>" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "mem") : depth0)) != null ? lookupProperty(stack1, "strused") : stack1), depth0)) +
      " </td>\n              </tr>\n              <tr>\n                <th scope=\"row\">Free</th>\n                <td>" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "mem") : depth0)) != null ? lookupProperty(stack1, "strfree") : stack1), depth0)) +
      "</td>\n              </tr>\n              <tr>\n                <th scope=\"row\">Swap Capacity</th>\n                <td>" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "mem") : depth0)) != null ? lookupProperty(stack1, "strswaptotal") : stack1), depth0)) +
      "</td>\n              </tr>\n              <tr>\n                <th scope=\"row\">Swap Used</th>\n                <td>" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "mem") : depth0)) != null ? lookupProperty(stack1, "strswapused") : stack1), depth0)) +
      " </td>\n              </tr>\n              <tr>\n                <th scope=\"row\">Swap Free</th>\n                <td>" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "mem") : depth0)) != null ? lookupProperty(stack1, "strswapfree") : stack1), depth0)) +
      "</td>\n              </tr>\n            </tbody>\n          </table>\n          </p>\n        </div>\n      </div>\n    </div>\n    <div class=\"col\">\n      <div class=\"card m-3 border border-primary\" style=\"max-width:400px\">\n        <div class=\"card-body\">\n          <h4 class=\"card-title text-primary\">Storage</h4>\n          <p class=\"card-text\">\n          <table class=\"table table-hover\">\n            <tbody>\n" +
      ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : (container.nullContext || {}), (depth0 != null ? lookupProperty(depth0, "fsSize") : depth0), {
        "name": "each",
        "hash": {},
        "fn": container.program(1, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 101,
            "column": 14
          },
          "end": {
            "line": 123,
            "column": 33
          }
        }
      })) != null ? stack1 : "") +
      "\n            </tbody>\n          </table>\n          </p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";
  },
  "useData": true
});

this["JST"]["views/partials/ticker.hbs"] = Handlebars.template({
  "1": function(container, depth0, helpers, partials, data) {
    var stack1, alias1 = container.lambda,
      alias2 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "      <div class=\"ticker__item\">\n        <a href=\"" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "image") : depth0)) != null ? lookupProperty(stack1, "link") : stack1), depth0)) +
      "\" target=\"_blank\"><img src=\"" +
      alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0, "image") : depth0)) != null ? lookupProperty(stack1, "url") : stack1), depth0)) +
      "\" style=\"max-height:30px\" /></a>\n        &nbsp;" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "lastBuildDate") : depth0), depth0)) +
      "\n      </div>\n" +
      ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : (container.nullContext || {}), (depth0 != null ? lookupProperty(depth0, "items") : depth0), {
        "name": "each",
        "hash": {},
        "fn": container.program(2, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 8,
            "column": 6
          },
          "end": {
            "line": 12,
            "column": 15
          }
        }
      })) != null ? stack1 : "");
  },
  "2": function(container, depth0, helpers, partials, data) {
    var alias1 = container.lambda,
      alias2 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "        <div class=\"ticker__item\">\n          <a class=\"text-white\" style=\"text-decoration: none;\" href=\"" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "link") : depth0), depth0)) +
      "\" target=\"_blank\">" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "title") : depth0), depth0)) +
      "</a>\n        </div>\n";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function(container, depth0, helpers, partials, data) {
    var stack1, alias1 = container.lambda,
      alias2 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
      };

    return "<div class=\"ticker-wrap\">\n  <div class=\"ticker\" id=\"ticker\">\n" +
      ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : (container.nullContext || {}), (depth0 != null ? lookupProperty(depth0, "feeds") : depth0), {
        "name": "each",
        "hash": {},
        "fn": container.program(1, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 3,
            "column": 4
          },
          "end": {
            "line": 13,
            "column": 13
          }
        }
      })) != null ? stack1 : "") +
      "  </div>\n</div>\n<script type=\"text/javascript\">\n  $(document).ready(function () {\n    $(\".ticker\").css(\"-webkit-animation-duration\", \"" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "tickerDelay") : depth0), depth0)) +
      "s\")\n    $(\".ticker\").css(\"animation-duration\", \"" +
      alias2(alias1((depth0 != null ? lookupProperty(depth0, "tickerDelay") : depth0), depth0)) +
      "s\")\n  });\n\n</script>\n";
  },
  "useData": true
});

this["JST"]["views/setup.hbs"] = Handlebars.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function(container, depth0, helpers, partials, data) {
    return "Hello\n";
  },
  "useData": true
});
