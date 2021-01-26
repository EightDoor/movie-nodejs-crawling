const mongoose = require("mongoose")
const connect = require("../db")

// 创建Schema
const MovieList = new mongoose.Schema({
  title: String,
  time: String,
  content: String,
  url: String,
  type: String,
})
const MovieModal = connect.model("MovieList",  MovieList)


module.exports = {MovieModal}