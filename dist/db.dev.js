"use strict";

var mongoose = require("mongoose");

var _require = require("./config"),
    config = _require.config; // config.js 配置
// const config = {
//   host: "127.0.0.1",
//   port: "27017",
//   username: "test",
//   pwd: "test",
//   db: "test"
// }
// module.exports = {config}


var mongo = mongoose.createConnection("mongodb://".concat(config.username, ":").concat(config.pwd, "@").concat(config.host, ":").concat(config.port, "/").concat(config.db), {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongo.on("open", function () {
  console.log("打开mongodb连接");
});
mongo.on("err", function (err) {
  console.log("🚀 ~ file: db.js ~ line 12 ~ mongo.on ~ err", err);
});
module.exports = mongo;