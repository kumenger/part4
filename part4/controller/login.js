const User=require('../model/User')
const jwt=require('jsonwebtoken')
const bcryt=require('bcrypt')
const loginRouter=require('express').Router()
loginRouter.post('/',async(req,res)=>{
    const {username,pasword}=req.body
    const user=await User.findOne({username})
    const passwordCorrect=user===null?false:bcryt.compare(pasword,user.passwordHash)
    if(!(user&&passwordCorrect)){
        res.status(401).json({error:"invalid username or password"})

    }
    const userToken={username:user.username,id:user._id}
    const token=jwt.sign(userToken,process.env.SEACRET,{expiresIn:60*60})
res.status(200).send({token,username:user.username,name:user.name})
})
module.exports=loginRouter