const mongoose=require("mongoose")

const incomeSchema=mongoose.Schema({

    nameIncome:{type:String,require:true},
    descriptionIncome:{type:String,require:true},
    dateIncome:{type:String,require:true},
    manyToHave:{type:String,require:true},
    remainIncome:{type:String,require:true}

},{
    timestamps:true,
})

module.exports=mongoose.model("income",incomeSchema)