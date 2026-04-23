
const multer=require('multer');
const storage=multer.diskStorage({
 destination:'uploads/',
 filename:(req,file,cb)=>cb(null,Date.now()+'-'+file.originalname)
});
const fileFilter=(req,file,cb)=>{
 if(file.mimetype==='application/pdf' || file.mimetype==='application/msword' || file.mimetype==='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
  cb(null,true);
 } else {
  cb(new Error('Only PDF and DOC files allowed'),false);
 }
};
module.exports=multer({storage,fileFilter,limits:{fileSize:5*1024*1024}}); // 5MB limit
