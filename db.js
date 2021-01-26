const mongoose = require("mongoose");
const { config } = require("./config");


// config.js 配置
// const config = {
//   host: "127.0.0.1",
//   port: "27017",
//   username: "test",
//   pwd: "test",
//   db: "test"
// }

// module.exports = {config}

const mongo = mongoose.createConnection(`mongodb://${config.username}:${config.pwd}@${config.host}:${config.port}/${config.db}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongo.on("open", ()=>{
  console.log("打开mongodb连接");
})
mongo.on("err",(err)=>{
  console.log("🚀 ~ file: db.js ~ line 12 ~ mongo.on ~ err", err)
})

module.exports = mongo
