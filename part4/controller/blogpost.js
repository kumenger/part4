const blogsRouter = require("express").Router();
const Blogs = require("../model/BlogPost");
const loger=require('../utilities/logger')
blogsRouter
  .post("/", (req, res,next) => {
    const body = req.body;
    if (!body.title) {
      return res.status(400).json({ error: "no inputs" });
    }
    const newblog = new Blogs({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    });
    newblog.save().then((result) => {
        res.json(result)
    }).catch((err) => {
         next(err)
    });
  })
  blogsRouter.get('/',(req,res,next)=>{
  Blogs.find({}).then((blog)=>{res.json(blog)}).catch((error)=>{next(error)})
  })
module.exports=blogsRouter