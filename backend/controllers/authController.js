exports.login=[
 body('email').isEmail().withMessage('Valid email required'),
 body('password').notEmpty().withMessage('Password is required'),
 async(req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});

  try {
   const user=await User.findOne({email:req.body.email.toLowerCase()});

   if(!user) return res.status(400).json({error:'Invalid email or password'});

   const ok=await bcrypt.compare(req.body.password,user.password);

   if(!ok) return res.status(400).json({error:'Invalid email or password'});

   const token=jwt.sign(
    {id:user._id,role:user.role},
    process.env.JWT_SECRET,
    {expiresIn:'7d'}
   );

   res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000
   });

   res.json({
    message:'Logged in successfully',
    role:user.role
   });

  } catch (err) {
   console.error('Login error:', err);
   res.status(500).json({error:'Login failed'});
  }
 }
];

exports.logout=(req,res)=>{
 res.clearCookie('token',{
  httpOnly:true,
  secure:true,
  sameSite:'none'
 });

 res.json({message:'Logged out'});
};
