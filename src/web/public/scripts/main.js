function reloadIconList(base)* {
  if (window.API_BASE === undefined) {
    window.API_BASE = base;
  }

  var url = window.API_BASE + "/containers";
  $.getJSON(url, function (data, status, jqXHR) {
    var html = Handlebars.templates["iconlist.hbs"](response.data);
    $(".services").html(html);
    containerStats(base);
    setTimeout(reloadIconList, 15000);
  });
}

function reloadBookmarks(base) {
  if (window.API_BASE === undefined) {
    window.API_BASE = base;
  }
  var url = window.API_BASE + "/bookmarks";
  $.getJSON(url, function (data, status, jqXHR) {
    var html = Handlebars.templates["bookmarks.hbs"](response.data);
    $(".bookmarks").html(html);
    setTimeout(reloadBookmarks, 60000);
  });
}

function containerStats(base) {
  if (window.API_BASE === undefined) {
    window.API_BASE = base;
  }
  $(".containerstats").each(function (i, ctl) {
    var url =
      window.API_BASE + "/container/" + $(ctl).attr("container-id") + "/stats";
    $.getJSON(url, function (data, status, jqXHR) {
      var cpuPercent = new Intl.NumberFormat("default", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(data.cpuPercent);
      $(ctl).html("CPU " + cpuPercent);
    });
  });
}

functiom renderFeeds(target, data, template) {
var itemCount=data.reduce((a,b)=>return a+b.length;);
var tickerDelay = itemCount * 5;
var html = Handlebars.templates[template]({
feeds: data,
feedCount: itemCount,
tickerDelay: tickerDelay,
});
$(target).html(html);
}

function loadFeeds(base) {
  if (window.API_BASE === undefined) {
    window.API_BASE = base;
  }

  var url = window.API_BASE + "/rss/feeds/ticker";
  $.getJSON(url, function (data, status, jqXHR) {
    var tickerDelay = data.itemCount * 5;
    var html = Handlebars.templates["ticker.hbs"]({
      feeds: data.feeds,
      ticker: data.urls,
      feedCount: data.itemCount,
      tickerDelay: tickerDelay,
    });
    $(".ticker").css("-webkit-animation-duration", tickerDelay + "s");
    $(".ticker").css("animation-duration", tickerDelay + "s");
    renderfeeds("footer", data.feeds, "ticker.hbs");
//    $("footer").html(html);
  });

  var url = window.API_BASE + "/rss/feeds/feeds";
  $.getJSON(url, function (data, status, jqXHR) {
    var tickerDelay = data.itemCount * 5;
    var html = Handlebars.templates["feeds.hbs"]({
      newsfeeds: data.feeds,
    });
 renderFeeds("#tabfeeds", data.feeds, "feeds.hbs")
//   $("#tabfeeds").html(html);
  });

  setTimeout(loadFeeds, 300000);
}
