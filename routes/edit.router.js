const express=require("express");
const editRouter=express.Router()
const {getOneEdit,getEdit,deleteEdit,addEdit,updateEdit}=require("../controllers/edit.controller")
const {validateEdit,validationEdit}=require("../middlewares/validator/edit.validater")
editRouter.post("/addEdit",validateEdit,validationEdit,addEdit)
editRouter.get("/getOneEdit/:id",getOneEdit)
editRouter.get("/getEdit",getEdit)
editRouter.delete("/deleteEdit/:id",deleteEdit)
editRouter.put("/updateEdit/:id",validateEdit,validationEdit,updateEdit)

module.exports=editRouter