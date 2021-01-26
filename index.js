const Koa = require("koa")
const Router = require("koa-router")
const {MovieDetailModel} = require("./modal/MovieDetail")

const start = require("./crawler")
const {StartDetail} = require("./detail")

const app = new Koa()
const router = new Router()


router.get("/", (ctx, next)=>{
  ctx.body = "hello zk"
})
router.get("/movie-list", (ctx, next)=>{
  // /html/gndy/dyzz/
  const type = ctx.query.type;
  if(!type) {
    ctx.body = "请输入参数"
  }else {
    start(type);
    ctx.body = "电影列表开始爬取存储"
  }
})
router.get("/movie-detail", (ctx, next)=>{
  StartDetail();
  ctx.body = "爬取详情页面"
})
router.get("/zk/movie-list", async (ctx, next)=>{
  const query = ctx.query;
  const page = query.page ? query.page - 1 : 0;
  const limit = Number(query.limit? query.limit : 10)
  const result = await MovieDetailModel.find().skip(page * limit).limit(limit)
  ctx.body = {
    data: result
  }
})

app.use(router.routes())
.use(router.allowedMethods())

app.listen(5102, ()=>{
  console.log("启动成功 5102")
})