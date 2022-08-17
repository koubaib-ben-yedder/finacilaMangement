const express=require("express")
const urlRouter=express.Router()

console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV!="production"){
    
    urlRouter.get("/developoment",(req,res)=>res.status(200).send({pageUrl:"http://localhost:5000",imageUrl:"http://localhost:5000/static"}))
    

}else{
   

    urlRouter.get("/production",(req,res)=>res.status(200).send({pageUrl:"https://finacialmanagement.herokuapp.com",imageUrl:"https://res.cloudinary.com/dw6apnqgq/image/upload/v1658930781"}))
}
module.exports=urlRouter