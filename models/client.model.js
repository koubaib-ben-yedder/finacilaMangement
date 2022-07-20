const mongoose=require("mongoose")

const clientSchema=mongoose.Schema({

    firstName:{type:String,require:true},
    lastName:{type:String,require:true},
    age:{type:Number,require:true},
    job:{type:String,require:true},
},{
    timestamps:true
})

module.exports=mongoose.model("client",clientSchema)