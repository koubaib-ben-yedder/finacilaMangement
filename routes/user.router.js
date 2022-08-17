const {getOneUser,deleteUser,addUser,updateUser,login,getUser}=require("../controllers/user.controller")
const {validateUser,validationUser}=require("../middlewares/validator/user.validater")
const {validateLogin,validationLogin}=require("../middlewares/validator/login.validator")
const express=require("express")
const userRouter=express.Router()

userRouter.get("/getOneUser",getOneUser)
userRouter.get("/getUser",getUser)

userRouter.delete("/deleteUser",deleteUser)
userRouter.put("/updateUser",validateUser,validationUser,updateUser)

module.exports=userRouter