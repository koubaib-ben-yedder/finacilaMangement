const mongoose=require("mongoose")

const roleSchema=mongoose.Schema({

    role:{type:String,require:true}
},{
    timeStamp:true
})

module.exports=mongoose.model("role",roleSchema)