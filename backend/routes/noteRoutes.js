const r=require('express').Router();
const auth=require('../middleware/auth');
const upload=require('../middleware/upload');
const {create,getAll,update,remove,like,rate,download}=require('../controllers/noteController');

r.post('/',auth,(req,res,next)=>{
 upload.single('file')(req,res,(err)=>{
  if(err) return res.status(400).json({error:err.message});
  next();
 });
},create);
r.get('/',getAll);
r.put('/:id',auth,update);
r.delete('/:id',auth,remove);
r.post('/:id/like',auth,like);
r.post('/:id/rate',auth,rate);
r.get('/:id/download',auth,download);

module.exports=r;
