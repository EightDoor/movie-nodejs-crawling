"use strict";

var Crawler = require("crawler");

var _require = require("./utils"),
    rendomUserAge = _require.rendomUserAge;

var connect = require("./db");

var _require2 = require("./modal/MovieList"),
    MovieModal = _require2.MovieModal;

var _require3 = require("./modal/MovieDetail"),
    MovieDetailModel = _require3.MovieDetailModel;

function StartDetail() {
  var result;
  return regeneratorRuntime.async(function StartDetail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(MovieModal.find());

        case 2:
          result = _context.sent;
          List(result);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function List(result) {
  var c = new Crawler({
    maxConnections: 10,
    rateLimit: 10,
    rotateUA: true,
    userAgent: rendomUserAge(),
    callback: function callback(error, res, done) {
      if (error) {
        console.log("🚀 ~ file: detail.js ~ line 12 ~ error", error);
      }

      try {
        var $ = res.$;
        var title = $(".title_all h1 font").text();
        var publishTime = $(".co_content8 ul").children()[0].prev.data;
        var coverImg = $("#Zoom span img").attr("src");
        var content = $("#Zoom span").text();
        var btUrl = $("#Zoom span a").attr("href");
        var data = {
          title: title,
          publishTime: publishTime,
          coverImg: coverImg,
          content: content,
          btUrl: btUrl
        };
        console.log(title);
        MovieDetailModel.findOne(data, function (err, doc) {
          if (!doc) {
            MovieDetailModel.create(data, function (error, result) {
              console.log("🚀 ~ file: detail.js ~ line 43 ~ MovieDetailModel.create ~ result", result);
            });
          }

          done();
        });
      } catch (err) {
        done();
      }
    }
  });
  result.forEach(function (item) {
    c.queue(item.url);
  }); // 当前队列为空时

  c.on("drain", function () {
    // 执行一些操作
    console.log("队列为空了");
    connect.close();
  });
}

module.exports = {
  StartDetail: StartDetail
};