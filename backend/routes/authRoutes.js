
const r=require('express').Router();
const auth=require('../middleware/auth');
const {register,login,logout,me}=require('../controllers/authController');
r.post('/register',register);
r.post('/login',login);
r.get('/me',auth,me);
r.post('/logout',logout);
module.exports=r;
