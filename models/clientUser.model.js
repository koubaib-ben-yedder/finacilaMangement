const mongoose=require("mongoose")


const clientUserSchema=mongoose.Schema({
    
    client:{type:mongoose.Types.ObjectId,require:true,ref:"client"},
    user:{type:mongoose.Types.ObjectId,require:true,ref:"users"}
},{

    timestamps:true
})

module.exports=mongoose.model("clientUser",clientUserSchema)