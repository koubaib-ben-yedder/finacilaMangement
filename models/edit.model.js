const mongoose=require("mongoose")


const editSchema=mongoose.Schema({

    nameEdit:{type:String,require:true},
    user:{type:mongoose.Types.ObjectId,require:true,role:"user"}

},{
    timestamps:true
})

module.exports=mongoose.model("edit",editSchema)