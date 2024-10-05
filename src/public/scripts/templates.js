(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['bookmarks.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"list-group-item list-group-item-primary\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":3,"column":53},"end":{"line":3,"column":61}}}) : helper)))
    + "</div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":0},"end":{"line":12,"column":9}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(data && lookupProperty(data,"last")),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":13,"column":0},"end":{"line":13,"column":77}}})) != null ? stack1 : "")
    + "\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <a href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" target=\"_blank\" class=\"list-group-item d-flex align-items-center gap-3 list-group-item-action\">\n    <span style=\"width:36px\"><img src=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":6,"column":39},"end":{"line":6,"column":158}}})) != null ? stack1 : "")
    + "\" style=\"max-width:32px;max-height:32px;\" /></span>\n    <span>\n      "
    + alias2(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias3,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":8,"column":6},"end":{"line":8,"column":14}}}) : helper)))
    + "\n      <div style=\"font-size: 12px;white-space:nowrap;overflow:hidden; !important;width:280px !important;\" class=\"d-block text-muted\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\n    </span>\n</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "/user-icons/"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"icon") : depth0), depth0));
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return alias1(container.lambda(((stack1 = (data && lookupProperty(data,"root"))) && lookupProperty(stack1,"API_BASE")), depth0))
    + "bookmarks/icon?host="
    + alias1((lookupProperty(helpers,"domainonly")||(depth0 && lookupProperty(depth0,"domainonly"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"href") : depth0),{"name":"domainonly","hash":{},"data":data,"loc":{"start":{"line":6,"column":127},"end":{"line":6,"column":151}}}));
},"7":function(container,depth0,helpers,partials,data) {
    return "";
},"9":function(container,depth0,helpers,partials,data) {
    return " <div class=\"list-group-item list-divider\"></div>";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"list-group\" >\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":14,"column":9}}})) != null ? stack1 : "")
    + "\n</div>	\n";
},"useData":true});
templates['feeds.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <li class=\"list-group-item list-group-item-primary\">\n<div onclick=\"window.open('"
    + alias4(((helper = (helper = lookupProperty(helpers,"link") || (depth0 != null ? lookupProperty(depth0,"link") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data,"loc":{"start":{"line":4,"column":27},"end":{"line":4,"column":35}}}) : helper)))
    + "'); return false;\" class=\"container primary\" >\n<div class=\"row\">\n<div class=\"col-2 mobile-hide\"><img style=\"max-height:80px;\" src=\""
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"image") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"image") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "\" /></div>\n<div class=\"col-10 d-flex align-items-center\" >\n<div class=\"container\"><div class=\"row\"><div class=\"col\">\n<span class=\"align-middle\"><h2>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":9,"column":31},"end":{"line":9,"column":40}}}) : helper)))
    + "</h2></span></div></div>\n<div class=\"row\"><div class=\"col\">\n<span><i>"
    + alias4(((helper = (helper = lookupProperty(helpers,"lastBuildDate") || (depth0 != null ? lookupProperty(depth0,"lastBuildDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastBuildDate","hash":{},"data":data,"loc":{"start":{"line":11,"column":9},"end":{"line":11,"column":26}}}) : helper)))
    + "</i></span></div></div>\n</div></div>\n</div></div></li>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":2},"end":{"line":22,"column":9}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <li class=\"list-group-item\" onclick=\"window.open('"
    + alias4(((helper = (helper = lookupProperty(helpers,"link") || (depth0 != null ? lookupProperty(depth0,"link") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data,"loc":{"start":{"line":15,"column":52},"end":{"line":15,"column":60}}}) : helper)))
    + "'); return false;\">\n    <h2 >"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":16,"column":9},"end":{"line":16,"column":18}}}) : helper)))
    + "</h2>\n    <small class=\"d-block text-muted\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"pubDate") || (depth0 != null ? lookupProperty(depth0,"pubDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pubDate","hash":{},"data":data,"loc":{"start":{"line":17,"column":38},"end":{"line":17,"column":49}}}) : helper)))
    + "</small>\n    <img src=\""
    + alias4(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"enclosure") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" style=\"float:left; max-width:100px;margin-right: 10px;\" />\n"
    + alias4(((helper = (helper = lookupProperty(helpers,"content") || (depth0 != null ? lookupProperty(depth0,"content") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data,"loc":{"start":{"line":19,"column":0},"end":{"line":19,"column":11}}}) : helper)))
    + "\n  </li>\n  <li class=\"list-group-item list-divider\"></li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ul class=\"list-group\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":23,"column":9}}})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true});
templates['iconbutton.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, alias2=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button id=\"btn-"
    + alias1((lookupProperty(helpers,"ident")||(depth0 && lookupProperty(depth0,"ident"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"name") : depth0),{"name":"ident","hash":{},"data":data,"loc":{"start":{"line":1,"column":16},"end":{"line":1,"column":35}}}))
    + "\" type=\"button\" class=\"btn btn-outline-secondary\" style=\"margin:5px;\" onClick=\"window.open('"
    + alias1(alias2((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "', '_blank')\" style=\"max-heightL80px\">\n<img src=\""
    + alias1(alias2((depth0 != null ? lookupProperty(depth0,"icon") : depth0), depth0))
    + "\" style=\"max-width:64px;max-height:64px\" />\n<br/>\n<div>"
    + alias1(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\n</button>\n";
},"useData":true});
templates['iconcards.hbs'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"groups") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":11,"column":9}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"card\" style=\"margin-bottom:5px\">\n  <div class=\"card-body\">\n    <h5 class=\"card-title\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</h5>\n"
    + ((stack1 = (lookupProperty(helpers,"eachwhen")||(depth0 && lookupProperty(depth0,"eachwhen"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? lookupProperty(depths[1],"items") : depths[1]),"group",depth0,{"name":"eachwhen","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":0},"end":{"line":8,"column":13}}})) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"iconbutton"),depth0,{"name":"iconbutton","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"groups") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":0},"end":{"line":24,"column":9}}})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"card border border-primary\" style=\"max-width:400px\">\n  <div class=\"card-body\">\n    <h4 class=\"card-title text-primary\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</h4>\n    <p class=\"card-text\">\n"
    + ((stack1 = (lookupProperty(helpers,"eachwhen")||(depth0 && lookupProperty(depth0,"eachwhen"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? lookupProperty(depths[1],"items") : depths[1]),"group",depth0,{"name":"eachwhen","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":0},"end":{"line":20,"column":13}}})) != null ? stack1 : "")
    + "    </p>\n  </div>\n</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isBootstrap") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":25,"column":7}}})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true});
templates['iconlist.hbs'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"list-group-item list-group-item-primary\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</div>\n"
    + ((stack1 = (lookupProperty(helpers,"eachwhen")||(depth0 && lookupProperty(depth0,"eachwhen"))||container.hooks.helperMissing).call(alias1,(depths[1] != null ? lookupProperty(depths[1],"items") : depths[1]),"group",depth0,{"name":"eachwhen","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":0},"end":{"line":20,"column":13}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(data && lookupProperty(data,"last")),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.program(6, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":20,"column":14},"end":{"line":21,"column":7}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"list-group-item d-flex align-items-center gap-3 list-group-item-action\" onclick=\"window.open('"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "','_blank');return false;\" >\n<div class=\"container\">\n<div class=\"row\">\n  <div class=\"col\" style=\"width:36px !important;max-width:36px !important;height:40px !important;padding: 0px;\"/>\n    <img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"icon") : depth0), depth0))
    + "\" style=\"align:middle;max-width:32px;height:32px;\" />\n  </div>\n  <div class=\"col\" style=\"overflow:hidden;\">\n    <div class=\"row\"><span style=\"color:white;\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</span></div>\n    <div class=\"row\"><div class=\"col col-md-auto\" style=\"font-size: 12px;white-space:nowrap;overflow:hidden; !important;\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div></div>\n  </div>\n  <div class=\"col\"><div class=\"containerstats mobile-hide\" container-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\">CPU: -</div></div>\n  <div class=\"col col-md-auto\"> \n    <span class=\"state "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"state") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"state") : depth0), depth0))
    + "</span>\n  </div>\n</div></div></div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "";
},"6":function(container,depth0,helpers,partials,data) {
    return " <div class=\"list-group-item list-divider\"></div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"list-group\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"groups") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":22,"column":9}}})) != null ? stack1 : "")
    + "\n</div>	\n";
},"useData":true,"useDepths":true});
templates['icontabs.hbs'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"groups") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":11,"column":9}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"card\" style=\"margin-bottom:5px\">\n  <div class=\"card-body\">\n    <h5 class=\"card-title\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</h5>\n"
    + ((stack1 = (lookupProperty(helpers,"eachwhen")||(depth0 && lookupProperty(depth0,"eachwhen"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? lookupProperty(depths[1],"items") : depths[1]),"group",depth0,{"name":"eachwhen","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":0},"end":{"line":8,"column":13}}})) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"iconbutton"),depth0,{"name":"iconbutton","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ul class=\"nav nav-tabs nav-justified\" role=\"tablist\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"groups") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":0},"end":{"line":18,"column":9}}})) != null ? stack1 : "")
    + "</ul>\n\n<div class=\"tab-content\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"groups") : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":0},"end":{"line":29,"column":9}}})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li class=\"nav-item\" role=\"presentation\">\n    <button class=\"nav-link "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(data && lookupProperty(data,"first")),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":28},"end":{"line":16,"column":55}}})) != null ? stack1 : "")
    + "\" data-bs-toggle=\"tab\" role=\"tab\" data-bs-target=\"#"
    + alias2((lookupProperty(helpers,"ident")||(depth0 && lookupProperty(depth0,"ident"))||container.hooks.helperMissing).call(alias1,depth0,{"name":"ident","hash":{},"data":data,"loc":{"start":{"line":16,"column":106},"end":{"line":16,"column":120}}}))
    + "\">"
    + alias2(container.lambda(depth0, depth0))
    + "</button>\n  </li>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "active";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"tab-pane container-fluid "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(data && lookupProperty(data,"first")),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.program(10, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":23,"column":37},"end":{"line":23,"column":76}}})) != null ? stack1 : "")
    + "\" role=\"tabpanel\" id=\""
    + container.escapeExpression((lookupProperty(helpers,"ident")||(depth0 && lookupProperty(depth0,"ident"))||alias2).call(alias1,depth0,{"name":"ident","hash":{},"data":data,"loc":{"start":{"line":23,"column":98},"end":{"line":23,"column":112}}}))
    + "\">\n<div style=\"margin:5px;\">\n"
    + ((stack1 = (lookupProperty(helpers,"eachwhen")||(depth0 && lookupProperty(depth0,"eachwhen"))||alias2).call(alias1,(depths[1] != null ? lookupProperty(depths[1],"items") : depths[1]),"group",depth0,{"name":"eachwhen","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":0},"end":{"line":27,"column":13}}})) != null ? stack1 : "")
    + "</div></div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "fade";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isBootstrap") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":30,"column":7}}})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true});
templates['system.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "Hello\n\n"
    + container.escapeExpression((lookupProperty(helpers,"debug")||(depth0 && lookupProperty(depth0,"debug"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"debug","hash":{},"data":data,"loc":{"start":{"line":3,"column":0},"end":{"line":3,"column":14}}}))
    + "\n";
},"useData":true});
templates['ticker.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "   <div class=\"ticker__item\">\n<a href=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"image") : depth0)) != null ? lookupProperty(stack1,"link") : stack1), depth0))
    + "\" target=\"_blank\"><img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"image") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" style=\"max-height:30px\" /></a>\n&nbsp;"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"lastBuildDate") : depth0), depth0))
    + "\n</div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":2},"end":{"line":12,"column":11}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"ticker__item\">\n<a class=\"text-white\" style=\"text-decoration: none;\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"link") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</a>\n</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " <div class=\"ticker-wrap\">\n <div class=\"ticker\" id=\"ticker\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"feeds") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":1},"end":{"line":13,"column":10}}})) != null ? stack1 : "")
    + " </div>\n</div>\n\n<script type=\"text/javascript\">\n$( document ).ready(function() {\n$(\".ticker\").css(\"-webkit-animation-duration\", \""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"tickerDelay") : depth0), depth0))
    + "s\")\n$(\".ticker\").css(\"animation-duration\", \""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"tickerDelay") : depth0), depth0))
    + "s\")\n});\n</script>\n";
},"useData":true});
})();