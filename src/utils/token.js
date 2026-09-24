const jwt=require('jsonwebtoken');
exports.signToken=(u)=>jwt.sign({id:u._id.toString(),role:u.role,email:u.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||'7d'});
