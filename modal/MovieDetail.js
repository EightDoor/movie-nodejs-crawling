const mongoose = require("mongoose")
const connect = require("../db")

const MovieDetail = mongoose.Schema({
  // 标题
  title: String,
  // 发布时间
  publishTime: String,
  // 封面图
  coverImg: String,
  // 内容
  content: String,
  // 磁力下载链接
  btUrl: String,
})

const MovieDetailModel = connect.model("MovieDetail", MovieDetail)

module.exports = {MovieDetailModel}
