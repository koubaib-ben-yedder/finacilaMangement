const mongoose=require("mongoose")


const factorUserSchema=mongoose.Schema({
    
    factor:{type:mongoose.Types.ObjectId,require:true,ref:"factor"},
    user:{type:mongoose.Types.ObjectId,require:true,ref:"user"}
})

module.exports=mongoose.model("factorUser",factorUserSchema)