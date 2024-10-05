function reloadIconList() {
  var url = window.API_BASE + "/containers";
  $.getJSON(url, function (data, status, jqXHR) {
    var html = Handlebars.templates["iconlist.hbs"](response.data);
    $(".services").html(html);
    containerStats();
    setTimeout(reloadIconList, 15000);
  });
}

function reloadBookmarks() {
  var url = window.API_BASE + "/bookmarks";
  $.getJSON(url, function (data, status, jqXHR) {
    var html = Handlebars.templates["bookmarks.hbs"](response.data);
    $(".bookmarks").html(html);
    setTimeout(reloadBookmarks, 60000);
  });
}

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function containerStats() {
  $(".containerstats").each(function (i, ctl) {
    var url =
      window.API_BASE + "containers/" + $(ctl).attr("container-id") + "/stats";
    $.getJSON(url, function (data, status, jqXHR) {
      var cpuPercent = new Intl.NumberFormat("default", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(data.cpuPercent);
      var memUsage = formatBytes(data.memory_stats.usage);
      $(ctl).html("CPU " + cpuPercent + ", MEM " + memUsage);
    });
  });
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
  var url = window.API_BASE + "/rss/feeds/ticker";
  $.getJSON(url, function (data, status, jqXHR) {
    renderFeeds("footer", data.feeds, "ticker.hbs");
  });

  url = window.API_BASE + "/rss/feeds/feeds";
  $.getJSON(url, function (data, status, jqXHR) {
    renderFeeds("#tabfeeds", data.feeds, "feeds.hbs");
  });

  setTimeout(loadFeeds, 60000);
}
