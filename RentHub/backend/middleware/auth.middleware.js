import jwt from "jsonwebtoken";

export const auth = (req,res,next)=>{
  const header = req.headers.authorization;
  if(!header) return res.status(401).json({error:"No token"});
  const token = header.split(" ")[1];
  try{
    const user = jwt.verify(token,process.env.JWT_SECRET);
    req.user = user;
    next();
  }catch(err){res.status(401).json({error:"Invalid token"})}
}