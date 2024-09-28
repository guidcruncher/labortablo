function reloadIconList(base) {
  if (window.API_BASE === undefined) {
    window.API_BASE = base;
  }

  var url = window.API_BASE + "/containers";
  $.getJSON(url, function (data, status, jqXHR) {
    var html = Handlebars.templates["iconlist.hbs"](response.data);
    $(".services").html(html);
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

  setTimeout(containerStats, 15000);
}

function loadFeeds(base) {
  if (window.API_BASE === undefined) {
    window.API_BASE = base;
  }

  var url = window.API_BASE + "/rss/feeds";
  $.getJSON(url, function (data, status, jqXHR) {
    var tickerDelay = data.itemCount * 5;
    var html = Handlebars.templates["tickerl.hbs"]({
      feeds: data.feeds,
      ticker: data.urls,
      feedCount: data.itemCount,
      tickerDelay: tickerDelay,
    });
    $(".ticker").css("-webkit-animation-duration", tickerDelay + "s");
    $(".ticker").css("animation-duration", tickerDelay + "s");
    $("footer").html(html);
  });

  setTimeout(loadFeeds, 300000);
}
