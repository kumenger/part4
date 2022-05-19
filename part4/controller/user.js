const userRouter = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const helper = require("../utilities/list_helper");
userRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (
   !( helper.checkLengRevoveWhiteSpace(username) &&
    helper.checkLengRevoveWhiteSpace(password))
  ) {
    return res.status(400).json({ error: "username or password is miising? ,it must minimum three characters long" });
  }
  const existinguser = await User.findOne({ username });
  if (existinguser) {
    return res.status(400).json({ error: "this username is taken" });
  }
  const salRounds = 10;
  const passwordHash = await bcrypt.hash(password, salRounds);
  const user = new User({ username, name, passwordHash });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});
userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate('blogs',{author:1,title:1,url:1,id:1});
  return res.json(users);
});
module.exports = userRouter;
