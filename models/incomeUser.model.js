const mongoose=require("mongoose")

const incomeUserSchema=mongoose.Schema({
    
    income:{type:mongoose.Types.ObjectId,require:true,ref:"income"},
    user:{type:mongoose.Types.ObjectId,require:true,ref:"user"}
},{
    timestamps:true
})

module.exports=mongoose.model("incomeUser",incomeUserSchema)