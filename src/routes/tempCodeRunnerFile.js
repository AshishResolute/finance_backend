router.post('/login',(req,res,next)=>{
//     try{
//         let {error,value} = loginSchema.validate(req.body);
//         if(error) return next(new AppError(`Invalid credentials`,400,error.message));
//         let {email,password} = value;
//         let findUserDetails = await db.query(`select * from users where email=$1`,[email]);
//         if(findUserDetails.rowCount===0) return next(new AppError(`user not found`,404,`signup before logging in!`));
//         let matchPassword = await bcrypt.compare(password,findUserDetails.rows[0].hashed_password);
//         if(!matchPassword) return next(new AppError(`Password not matched!`,400,'Try with another password'));
//         let token = jwt.sign({id:findUserDetails.rows[0].id,role:findUserDetails.rows[0].role},process.env.)
//     }
// })