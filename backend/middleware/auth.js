import jwt from "jsonwebtoken"

const authentication =(req,res,next)=>{
  const authHeader = req.headers['authorization']
  if(!authHeader){
    return res.status(400).json({errors:"token not found"})
  }

  const token = authHeader.split(" ")[1]
  try{
    const tokenData =  jwt.verify(token,process.env.JWT_SECRET)
  req.currentUser = {userId:tokenData.userId}
  next()
  }catch(err){
    res.status(401).json({errors:err.message})
  }
  
}

export default authentication