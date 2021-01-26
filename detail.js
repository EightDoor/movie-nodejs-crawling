const Crawler = require("crawler")
const {rendomUserAge} = require("./utils")
const connect = require("./db")
const {MovieModal} = require("./modal/MovieList")
const {MovieDetailModel} = require("./modal/MovieDetail")



async function StartDetail () {
 const result = await MovieModal.find()
 List(result)
}

function List(result) {
  const c = new Crawler(
    {
      maxConnections: 10,
      rateLimit: 10,
      rotateUA: true,
      userAgent: rendomUserAge(),
      callback: (error, res, done)=>{
        if(error) {
            console.log("🚀 ~ file: detail.js ~ line 12 ~ error", error)
        }
        try {
          const $ = res.$;
          const title = $(".title_all h1 font").text()
          const publishTime = $(".co_content8 ul").children()[0].prev.data
          const coverImg = $("#Zoom span img").attr("src")
          const content = $("#Zoom span").text()
          const btUrl = $("#Zoom span a").attr("href")
          const data = {
            title,
            publishTime,
            coverImg,
            content,
            btUrl,
          }
          console.log(title);
          MovieDetailModel.findOne(data, function(err, doc){
            if(!doc) {
              MovieDetailModel.create(data, function(error, result){
                console.log("🚀 ~ file: detail.js ~ line 43 ~ MovieDetailModel.create ~ result", result)
              })
            }
            done()
          })
        }catch(err){
          done()
        }
      }
    }
  )
  result.forEach(item => {
    c.queue(item.url)
  });
  // 当前队列为空时
  c.on("drain", function(){
    // 执行一些操作
    console.log("队列为空了");
    connect.close()
  })
}

module.exports = {StartDetail}