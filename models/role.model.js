const mongoose=require("mongoose")

const roleSchema=mongoose.Schema({

    roles:{type:String,require:true}
},{
    timeStamp:true
})

module.exports=mongoose.model("role",roleSchema)