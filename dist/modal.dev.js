"use strict";

var mongoose = require("mongoose");

var connect = require("./db"); // 创建Schema


var MovieList = new mongoose.Schema({
  title: String,
  time: String,
  content: String,
  url: String,
  type: String
});
var MovieModal = connect.model("MovieList", MovieList);
module.exports = {
  MovieModal: MovieModal
};