const jwt =require("jsonwebtoken")
const user=require("../../models/user.model")
exports.authentication=async(req,res,next)=>{

  
   
    try {
        const {authorization}=req.headers
      
        const decode=jwt.verify(authorization,process.env.webtokenkey)
        req.password=decode.password
        req.email=decode.email

        
        const userOne=await user.findOne({email:decode.email,password:decode.password})
        next()
        if(userOne){

            return res.status(400).send({msg:"you dont have access"})
        }


     
       


        
    } catch (error) {
        
        return res.status(500).send(error)
    }


}