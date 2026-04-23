
const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
 const token=req.cookies.token;
 if(!token) return res.status(401).json('No token');
 try {
  const data=jwt.verify(token,process.env.JWT_SECRET);
  req.user=data; next();
 } catch (err) {
  res.status(401).json('Invalid token');
 }
};
