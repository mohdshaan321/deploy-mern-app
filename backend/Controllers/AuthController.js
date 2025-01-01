
const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")




const signup = async (req,res)=>{
try {
    const {name,email,password} = req.body;
    const user = await UserModel.findOne({email})
    if(user){
        return res.status(409)
        .json({message: "User already exist, You can login", success: false})

    }

    const userModel = new UserModel({name,email,password});
    userModel.password = await bcrypt.hash(password,10);
    await userModel.save()
     res.status(201)
     .json({message:"Signup successfully", success: true})
    

    
} catch (error) {
    res.status(500)
    .json({message:`Internal server error ${error}`, success: false})
}

}


const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email})
        const errorMsg = "Authentication failed email & password is wrong"



        if(!user){
            return res.status(403)
            .json({message: errorMsg, success: false})
    
        }
        
        // first password is come from the user's data save in the server side and second is the user who sit in the client side and do the login 
        const isEqualPassword = await bcrypt.compare(password,user.password) 

        if(!isEqualPassword){
            return res.status(403)
            .json({message: errorMsg, success: false})
    
        }
        // firstly jwt validate the user by confirming id or email 
        const jwtToken = jwt.sign({ email: user.email, _id: user._id },process.env.JWT_SECRET, { expiresIn: "24h" });
        
        //   console.log(jwtToken)




         res.status(201)
         .json({message:"Login successfully", success: true , jwtToken , name:user.name , email})
        
    
        
    } catch (error) {
        res.status(500)
        .json({message:`Internal server error ${error}`, success: false})
    }
    
    }
    

module.exports = {
        signup,
        login
}