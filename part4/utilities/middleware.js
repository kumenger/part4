const logger=require('./logger')
const unknowEndpoint=(req,res)=>{
    return res.status(4004).json({error:"unknow end point"})
}
const errorHandler=(error,req,res,next)=>{
    if (error.name === 'CastError') {
        return req.status(400).json({ error: 'malformatted id' })
      } else if (error.name === 'ValidationError') {
        return req.status(400).json({ error: error.message })
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
module.exports={unknowEndpoint,errorHandler,requestLogger}