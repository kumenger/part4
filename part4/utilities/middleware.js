const logger=require('./logger')
const jwt=require('jsonwebtoken')
const User = require('../model/User')
const unknowEndpoint=(req,res)=>{
    return res.status(4004).json({error:"unknow end point"})
}
const errorHandler=(error,req,res,next)=>{
    if (error.name === 'CastError') {
        return res.status(400).json({ error: 'malformatted id' })
      } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
      }else if(error.name==='JsonWebTokenError'){
        return res.status(401).json({error:"invalid token"})
      }
      else if(error.name==='TokenExpiredError'){
        return res.status(401).json({error:"token expired"})
      }
      else if(error.name==='TypeError'){
        return res.status(401).json({error:"invalid id"})
      }
    
      next(error)
}
const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }
   const tokenExtractor = (request,response,next) => {
    const authorization = request.get("authorization");
    request.token=null
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
       request.token= authorization.substring(7);
    }
  
    next()
  };
  const userExtractor=async (req,res,next)=>{
      const authorization = req.get("authorization");
      
      if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        const decodedToken = jwt.verify(authorization.substring(7), process.env.SEACRET);
        const user = await User.findById(decodedToken.id);
        req.user= user;

     }else{
       req.user=null
     }
     next()

  }
module.exports={unknowEndpoint,errorHandler,requestLogger,tokenExtractor,userExtractor}