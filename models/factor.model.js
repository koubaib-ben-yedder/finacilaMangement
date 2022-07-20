const mongoose=require("mongoose")

const factorSchema=mongoose.Schema({

    descriptionFactor:{type:String,require:true},
    client:{type:String,require:true},
    imageFactor:{type:String},
    dateFactor:{type:String,require:true},
    valueToPay:{type:String,require:true},
    remainFactor:{type:String,require:true}    
},{

    timestamps:true
})

module.exports=mongoose.model("factor",factorSchema)