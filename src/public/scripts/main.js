function apiBase() {
  var url = window.API_BASE;

  if (!url.endsWith("/")) {
    url += "/";
  }

  return url;
}

function applyTheme(name, s, e) {
  var curr = new Date();
  var start = new Date();
  var end = new Date();
  var result = name;
  start.setHours(s);
  start.setMinutes(0);
  start.setSeconds(0);
  end.setHours(e);
  end.setMinutes(0);
  end.setSeconds(0);

  if (s > curr.getHours()) {
    start.setDate(start.getDate() - 1);
  }

  if (e < s) {
    end.setDate(start.getDate() + 1);
    end.setHours(e);
  }

  if (name == "auto") {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    result = "light";
    if (darkThemeMq.matches) {
      result = "dark";
    }
    var html = document.getElementsByTagName("html")[0];
    html.setAttribute("data-mdb-theme", result);

    darkThemeMq.addListener(e => {
      var theme = "light";
      if (e.matches) {
        theme = "dark";
      } else {
        theme = "light";
      }
      var html = document.getElementsByTagName("html")[0];
      html.setAttribute("data-mdb-theme", theme);
    });
    return;
  }

  if (result == "scheduled") {
    result = "light";

    if ((curr >= start) && (curr < end)) {
      result = "dark";
    }
  }

  var html = document.getElementsByTagName("html")[0];
  html.setAttribute("data-mdb-theme", result);
}


function reloadSystem() {
  var url = apiBase() + "system";
  $.getJSON(url, function(data, status, jqXHR) {
    var html = Handlebars.templates["system.hbs"](response.data);
    $("#system0").html(html);
    setTimeout(reloadSystem, 15000);
  });
}

function reloadIconList() {
  var url = apiBase() + "containers";
  $.getJSON(url, function(data, status, jqXHR) {
    var html = Handlebars.templates["iconlist.hbs"](response.data);
    $("#services0").html(html);
    containerStats();
    setTimeout(reloadIconList, 15000);
  });
}

function reloadBookmarks() {
  var url = apiBase() + "bookmarks";
  $.getJSON(url, function(data, status, jqXHR) {
    var html = Handlebars.templates["bookmarks.hbs"](response.data);
    $("#bookmarks0").html(html);
    setTimeout(reloadBookmarks, 60000);
  });
}

function containerStats() {
  $(".containerstats").each(function(i, ctl) {
    var url =
      apiBase();

    if (!url.endsWith("/")) {
      url += "/";
    }
    url += "containers/" + $(ctl).attr("container-id") + "/stats";
    $.getJSON(url, function(data, status, jqXHR) {
      var cpuPercent = new Intl.NumberFormat("default", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(data.cpuPercent);
      $(ctl).html("CPU " + cpuPercent + ", MEM " + data.memoryUsage);
    });
  });
  setTimeout(containerStats, 10000);
}

function renderFeeds(target, data, template) {
  var itemCount = data.map((a) => a.items.length + 1).reduce((a, b) => a + b);
  var tickerDelay = itemCount * 5;
  var html = Handlebars.templates[template]({
    feeds: data,
    feedCount: itemCount,
    tickerDelay: tickerDelay,
  });

  if (template == "ticker.hbs") {
    $(".ticker").css("-webkit-animation-duration", tickerDelay + "s");
    $(".ticker").css("animation-duration", tickerDelay + "s");
  }
  target.html(html);
}

function loadFeeds() {
  var url = apiBase() + "rss/feeds/ticker";
  $.getJSON(url, function(data, status, jqXHR) {
    renderFeeds("footer", data.feeds, "ticker.hbs");
  });

  url = apiBase() + "rss/feeds/feeds";
  $.getJSON(url, function(data, status, jqXHR) {
    renderFeeds("#feeds0", data.feeds, "feeds.hbs");
  });

  setTimeout(loadFeeds, 60000);
}
