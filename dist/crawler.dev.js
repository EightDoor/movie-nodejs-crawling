"use strict";

var Crawler = require("crawler");

var connect = require("./db");

var _require = require("./utils"),
    rendomUserAge = _require.rendomUserAge;

var _require2 = require("./modal/MovieList"),
    MovieModal = _require2.MovieModal;

function start(type) {
  var baseUrl = "https://www.ygdy8.net";
  var typeUrl = type ? type : '/html/gndy/dyzz/';
  var sourceData = {
    // 1是首页  2是列表页面
    status: 1
  }; // 所有的列表页面

  var titleList = [];
  var c = new Crawler({
    maxConnections: 10,
    rateLimit: 10,
    rotateUA: true,
    userAgent: rendomUserAge(),
    callback: function callback(error, res, done) {
      if (error) {
        console.log(error);
      } else {
        var $ = res.$; // 获取首页

        if (sourceData.status === 1) {
          $(".x select").find("option").each(function () {
            var url = $(this).attr("value");
            c.queue(baseUrl + typeUrl + url);
          });
          sourceData.status = 2;
        } else {
          // $默认使用Cheerio
          // 这是为服务端设计的轻量级jQuery核心实现
          $(".co_content8 ul table").each(function () {
            var url = $(this).find(".ulink").attr("href");
            var title = $(this).find(".ulink").text();
            var time = $(this).find("td font").text();
            var content = $(this).find("tr").last().find("td").text();
            var data = {
              title: title,
              time: time,
              content: content,
              url: baseUrl + url,
              type: typeUrl
            };
            titleList.push(data);
            MovieModal.findOne(data, function (err, docs) {
              if (!docs) {
                // 直接存储
                MovieModal.create(data).then(function (res) {
                  console.log("🚀 ~ file: index.js ~ line 54 ~ MovieModal.insertMany ~ res", res);
                });
              }
            });
          });
        }

        done();
      }
    }
  }); // 爬取一个网页

  c.queue(baseUrl + typeUrl + "index.html"); // 当前队列为空时

  c.on("drain", function () {
    // 执行一些操作
    console.log("队列为空了");
    connect.close();
  });
}

module.exports = start;