const mongoose=require("mongoose")

const editUserSchema=mongoose.Schema({
    
    edit:{type:mongoose.Types.ObjectId,require:true,ref:"edit"},
    user:{type:mongoose.Types.ObjectId,require:true,ref:"user"}
},{
    timestamps:true
})

module.exports=mongoose.model("editUser",editUserSchema)