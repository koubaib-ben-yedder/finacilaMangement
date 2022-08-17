const express =require("express")
const   factorRouter=express.Router()
const {getFactor,getOneFactor,deleteFactor,updateFactor,addFactor}=require("../controllers/factor.contoller")
const {validateFactor,validationFactor}=require("../middlewares/validator/factor.validater")
const {upload} =require("../middlewares/upload/multer")
const {cloudinaryFn}  =require("../middlewares/upload/cloudinary")
factorRouter.get("/getFactor/:pageNumber",getFactor)
factorRouter.get("/getOneFactor/:id",getOneFactor)
factorRouter.post("/addFactor",upload.single("imageFactor"),validateFactor,validationFactor,cloudinaryFn,addFactor)
factorRouter.put("/updateFactor/:id",upload.single("imageFactor"),validateFactor,validationFactor,cloudinaryFn,updateFactor)
factorRouter.delete("/deleteFactor/:id",deleteFactor)

module.exports=factorRouter