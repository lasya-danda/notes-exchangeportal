
const mongoose = require('mongoose');
module.exports = mongoose.model('Note', new mongoose.Schema({
  title:String,subject:String,file:String,
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  likes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
  ratings:[{user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},rating:Number}],
  downloads:{type:Number,default:0}
},{timestamps:true}));
