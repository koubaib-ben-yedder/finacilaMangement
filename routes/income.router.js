const  express=require("express")
const  incomeRouter=express.Router()
const {getIncome,getOneIncome,deleteIncome,updateIncome,addIncome}=require("../controllers/income.controller")
const {validateIcome,validationIcome}=require("../middlewares/validator/income.validater")
const {upload} =require("../middlewares/upload/multer")

incomeRouter.get("/getIncome",getIncome)
incomeRouter.get("/getOneIncome/:id",getOneIncome)
incomeRouter.post("/addIncome",validateIcome,validationIcome,addIncome)
incomeRouter.delete("/deleteIncome/:id",deleteIncome)
incomeRouter.put("/updateIncome/:id",validateIcome,validationIcome,updateIncome)
module.exports=incomeRouter