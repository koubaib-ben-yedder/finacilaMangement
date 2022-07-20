const mongoose=require("mongoose")


const connect=()=>{

    try {

        mongoose.connect(process.env.MONGO_URI)

        console.log("mongoo connect ")
        
    } catch (error) {

        console.error(error)
        
    } 
}

module.exports=connect
