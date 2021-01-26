"use strict";

var mongoose = require("mongoose");

var connect = require("../db");

var MovieDetail = mongoose.Schema({
  // 标题
  title: String,
  // 发布时间
  publishTime: String,
  // 封面图
  coverImg: String,
  // 内容
  content: String,
  // 磁力下载链接
  btUrl: String
});
var MovieDetailModel = connect.model("MovieDetail", MovieDetail);
module.exports = {
  MovieDetailModel: MovieDetailModel
};