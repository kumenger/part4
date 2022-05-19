const blogsRouter = require("express").Router();
const User = require("../model/User");
const Blogs = require("../model/BlogPost");
const loger = require("../utilities/logger");
const jwt = require("jsonwebtoken");


const getTokenForm = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
};
blogsRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const {token}=req
  if (!body.title || !body.url) {
    return res
      .status(400)
      .json({ error: "title and url required to make new blog" })
      .end();
  }

  try {
    //const token = getTokenForm(req);
    const decodedToken = jwt.verify(token, process.env.SEACRET);
    const user = await User.findById(decodedToken.id);
    const newblog = new Blogs({
      title: body.title,
      author: body.author || " ",
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });
   
    const savedNote = await newblog.save();

    user.blogs = user.blogs.concat(savedNote._id);
    await user.save();
    res.status(200).json(savedNote);
  } catch (e) {
    next(e);
  }
});
blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blogs.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    res.json(blogs);
  } catch (exp) {
    next(exp);
  }

  // Blogs.find({}).then((blog)=>{res.json(blog)}).catch((error)=>{next(error)})
});
blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Blogs.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});
blogsRouter.put("/:id", async (req, res, next) => {
  const likes = req.body.likes;
  try {
    const updatedNote = await Blogs.findByIdAndUpdate(
      req.params.id,
      { likes },
      { runValidators: true, context: "query" }
    );
    res.json(updatedNote);
  } catch (e) {
    next(e);
  }
});
module.exports = blogsRouter;
