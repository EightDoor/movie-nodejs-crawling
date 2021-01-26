"use strict";

var Koa = require("koa");

var Router = require("koa-router");

var _require = require("./modal/MovieDetail"),
    MovieDetailModel = _require.MovieDetailModel;

var start = require("./crawler");

var _require2 = require("./detail"),
    StartDetail = _require2.StartDetail;

var app = new Koa();
var router = new Router();
router.get("/", function (ctx, next) {
  ctx.body = "hello zk";
});
router.get("/movie-list", function (ctx, next) {
  // /html/gndy/dyzz/
  var type = ctx.query.type;

  if (!type) {
    ctx.body = "请输入参数";
  } else {
    start(type);
    ctx.body = "电影列表开始爬取存储";
  }
});
router.get("/movie-detail", function (ctx, next) {
  StartDetail();
  ctx.body = "爬取详情页面";
});
router.get("/zk/movie-list", function _callee(ctx, next) {
  var query, page, limit, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = ctx.query;
          page = query.page ? query.page - 1 : 0;
          limit = Number(query.limit ? query.limit : 10);
          _context.next = 5;
          return regeneratorRuntime.awrap(MovieDetailModel.find().skip(page * limit).limit(limit));

        case 5:
          result = _context.sent;
          ctx.body = {
            data: result
          };

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(5102, function () {
  console.log("启动成功 5102");
});