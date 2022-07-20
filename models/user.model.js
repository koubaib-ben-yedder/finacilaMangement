  const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    
    firstName:{type:String,require:true},
    lastName:{type:String,require:true},
    age:{type:Number,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    role:{type:mongoose.Types.ObjectId,require:true,ref:"role"}
},{
    timeStamp:true,
})

module.exports=mongoose.model("user",userSchema)