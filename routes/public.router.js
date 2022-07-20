const {validateLogin,validationLogin}=require("../middlewares/validator/login.validator")
const{login,addUser}=require("../controllers/user.controller")
const {validateUser,validationUser}=require("../middlewares/validator/user.validater")

const express=require("express")
const publicRouter=express.Router()


publicRouter.post("/login",validateLogin,validationLogin,login)
publicRouter.post("/addUser",validateUser,validationUser,addUser)
  

module.exports=publicRouter