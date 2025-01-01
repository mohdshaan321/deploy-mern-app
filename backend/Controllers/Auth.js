const jwt = require("jsonwebtoken")

const ensureAuthenticated = (req,res,next)=>{

   console.log('Authorization Header:', req.headers['authorization']);

   
      const auth = req.headers['authorization'];
      if(!auth){
         return res.sendStatus(403); }

      try{
         const token = auth.split(' ')[1];
         const decoded = jwt.verify(token,process.env.JWT_SECRET)
         req.user = decoded;
         console.log(decoded)
         next()
      }catch(error){
            return res.status(403)
               .json({message: `Unauthorized, jwt token wrong or expired ${error}` })
      }
      }

module.exports = ensureAuthenticated