const Crawler = require("crawler")
const connect = require("./db")
const {rendomUserAge} = require("./utils")
const {MovieModal} = require("./modal/MovieList")


function start (type) {
    const baseUrl = "https://www.ygdy8.net";
    const typeUrl = type?type:'/html/gndy/dyzz/'
    const sourceData = {
      // 1是首页  2是列表页面
      status: 1
    }
    // 所有的列表页面
    const titleList = [];
    const c = new Crawler({
      maxConnections: 10,
      rateLimit: 10,
      rotateUA: true,
      userAgent: rendomUserAge(),
      callback: (error, res, done)=>{
        if(error) {
          console.log(error);
        }else {
          const $ = res.$;
          // 获取首页
          if(sourceData.status === 1) {
            $(".x select").find("option").each(function(){
              const url = $(this).attr("value");
              c.queue(baseUrl + typeUrl + url)
            })
            sourceData.status = 2
          }else {
            // $默认使用Cheerio
            // 这是为服务端设计的轻量级jQuery核心实现
            $(".co_content8 ul table").each(function(){
              const url = $(this).find(".ulink").attr("href");
              const title = $(this).find(".ulink").text();
              const time = $(this).find("td font").text();
              const content = $(this).find("tr").last().find("td").text()
              const data = {
                title,
                time,
                content,
                url: baseUrl + url,
                type: typeUrl
              }
              titleList.push(data)
              MovieModal.findOne(data, function(err, docs){
                if(!docs) {
                    // 直接存储
                    MovieModal.create(data).then(res=>{
                      console.log("🚀 ~ file: index.js ~ line 54 ~ MovieModal.insertMany ~ res", res)
                    })
                }
              })
            })
          }
          done();
        }
      }
    })

    // 爬取一个网页
    c.queue(baseUrl + typeUrl + "index.html")

    // 当前队列为空时
    c.on("drain", function(){
      // 执行一些操作
      console.log("队列为空了");
      connect.close()
    })
}


module.exports = start