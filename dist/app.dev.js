"use strict";

var Koa = require("koa");

var Router = require("koa-router");

var start = require("./crawler");

var app = new Koa();
var router = new Router();
router.get("/", function (ctx, next) {
  ctx.body = "hello zk";
});
router.get("/move-list", function (ctx, next) {
  var type = ctx.query.type;

  if (!type) {
    ctx.body = "请输入参数";
  } else {
    start(type);
    ctx.body = "电影列表开始爬取存储";
  }
});
router.get("/");
app.use(router.routes()).use(router.allowedMethods());
app.listen(5102, function () {
  console.log("启动成功 5102");
});