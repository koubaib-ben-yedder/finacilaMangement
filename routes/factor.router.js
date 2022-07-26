const express =require("express")
const   factorRouter=express.Router()
const {getFactor,getOneFactor,deleteFactor,updateFactor,addFactor}=require("../controllers/factor.contoller")
const {validateFactor,validationFactor}=require("../middlewares/validator/factor.validater")
const {upload} =require("../middlewares/upload/multer")
factorRouter.get("/getFactor",getFactor)
factorRouter.get("/getOneFactor/:id",getOneFactor)
factorRouter.post("/addFactor",validateFactor,validationFactor,addFactor)
factorRouter.put("/updateFactor/:id",validateFactor,validationFactor,upload.single("imageFactor"),updateFactor)
factorRouter.delete("/deleteFactor/:id",deleteFactor)

module.exports=factorRouter