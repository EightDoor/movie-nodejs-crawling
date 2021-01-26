"use strict";

var _require = require("bluebird"),
    config = _require.config;

var qiniu = require("qiniu");

var _require2 = require("./qn-config"),
    accessKey = _require2.accessKey,
    secretKey = _require2.secretKey,
    bucket = _require2.bucket; // qn-config.js
// const accessKey = 'xxx';
// const secretKey = 'xxx';
// // 上传的空间
// const bucket = "xxx"
// module.exports = {accessKey,secretKey, bucket }
//上传到七牛后保存的文件名


var key = 'my-nodejs-logo.png'; // 构建上传策略函数

function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
  return putPolicy.token();
} //生成上传 Token


var token = uptoken(bucket, key); //要上传文件的本地路径

var filePath = './ruby-logo.png'; //构造上传函数

function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
    if (!err) {
      // 上传成功， 处理返回值
      console.log(ret.hash, ret.key, ret.persistentId);
    } else {
      // 上传失败， 处理返回代码
      console.log(err);
    }
  });
} //调用uploadFile上传


uploadFile(token, key, filePath);