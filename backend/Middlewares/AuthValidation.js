const Joi = require("joi");

const signupValidation = (req,res,next)=>{ 
    
    const schema = Joi.object({

     name: Joi.string().min(3).max(100).required(),
     email: Joi.string().email().required(),
     password: Joi.string().min(4).max(100).required()
    })

    
    const Validation = schema.validate(req.body)
    // console.log(Validation.error)
    const validationError = Validation.error


if(validationError){
return res.status(400)
    .json({message: `Bad request`,validationError })

}
next();
}




const loginValidation = (req,res,next)=>{
    const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required()
})

const Validation = schema.validate(req.body)
// console.log(Validation.error)
const validationError = Validation.error

if(validationError){
return res.status(400)
   .json({message: "Bad request", validationError})

}
next();
}

module.exports = {signupValidation,loginValidation}