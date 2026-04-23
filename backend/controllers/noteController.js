
const Note=require('../models/Note');
const {body,validationResult}=require('express-validator');

const getServerBaseUrl = () => {
 return process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5002}`;
};

exports.create=[
 body('title').notEmpty().withMessage('Title is required'),
 body('subject').notEmpty().withMessage('Subject is required'),
 async(req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
  if(!req.file) return res.status(400).json({error:'File is required and must be PDF or DOC'});
  try {
   const note=await Note.create({
    title:req.body.title,subject:req.body.subject,
    file:req.file.filename,user:req.user.id
   });
   res.json(note);
  } catch (err) {
   res.status(500).json({error:'Server error'});
  }
 }
];

exports.getAll=async(req,res)=>{
 try {
  const page=parseInt(req.query.page)||1;
  const limit=10;
  const skip=(page-1)*limit;
  const search=req.query.search||'';
  const query=search ? {$or:[{title:{$regex:search,$options:'i'}},{subject:{$regex:search,$options:'i'}}]} : {};
  const notes=await Note.find(query).populate('user','name').sort({createdAt:-1}).skip(skip).limit(limit);
  const total=await Note.countDocuments(query);
  res.json({notes,total,pages:Math.ceil(total/limit)});
 } catch (err) {
  res.status(500).json({error:'Server error'});
 }
};

exports.update=[
 body('title').notEmpty().withMessage('Title is required'),
 body('subject').notEmpty().withMessage('Subject is required'),
 async(req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
  try {
   const note=await Note.findOneAndUpdate({_id:req.params.id,user:req.user.id},{
    title:req.body.title,subject:req.body.subject
   },{new:true});
   if(!note) return res.status(404).json({error:'Note not found'});
   res.json(note);
  } catch (err) {
   res.status(500).json({error:'Server error'});
  }
 }
];

exports.remove=async(req,res)=>{
 try {
  const note=await Note.findOneAndDelete({_id:req.params.id,user:req.user.id});
  if(!note) return res.status(404).json({error:'Note not found'});
  res.json({message:'Deleted'});
 } catch (err) {
  res.status(500).json({error:'Server error'});
 }
};

exports.like=async(req,res)=>{
 try {
  const note=await Note.findById(req.params.id);
  if(!note) return res.status(404).json({error:'Note not found'});
  const index=note.likes.indexOf(req.user.id);
  if(index>-1){
   note.likes.splice(index,1);
  } else {
   note.likes.push(req.user.id);
  }
  await note.save();
  res.json(note);
 } catch (err) {
  res.status(500).json({error:'Server error'});
 }
};

exports.rate=async(req,res)=>{
 try {
  const {rating}=req.body;
  const note=await Note.findById(req.params.id);
  if(!note) return res.status(404).json({error:'Note not found'});
  const existing=note.ratings.find(r=>r.user.toString()===req.user.id);
  if(existing){
   existing.rating=rating;
  } else {
   note.ratings.push({user:req.user.id,rating});
  }
  await note.save();
  res.json(note);
 } catch (err) {
  res.status(500).json({error:'Server error'});
 }
};

exports.download=async(req,res)=>{
 try {
  const note=await Note.findById(req.params.id);
  if(!note) return res.status(404).json({error:'Note not found'});
  note.downloads+=1;
  await note.save();
  res.json({url:`${getServerBaseUrl()}/uploads/${note.file}`});
 } catch (err) {
  res.status(500).json({error:'Server error'});
 }
};
