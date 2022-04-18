const blogsRouter = require("express").Router();
const Blogs = require("../model/BlogPost");
const loger = require("../utilities/logger");
blogsRouter.post("/", async (req, res, next) => {
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

  try {
    const savedNote = await newblog.save();
    res.json(savedNote);
  } catch (exp) {
    next(exp);
  }
});
blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blogs.find({});
    res.json(blogs);
  } catch (exp) {
    next(exp);
  }

  // Blogs.find({}).then((blog)=>{res.json(blog)}).catch((error)=>{next(error)})
});
module.exports = blogsRouter;
