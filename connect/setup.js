const user=require("../models/user.model")
const role=require("../models/role.model")
const bcryptjs=require("bcryptjs")
const setup=async()=>{
    

    try {

        const roleData=await role.find()

        if (roleData.length==0){

           await role.insertMany([{role:"Admin"},{role:"Gestionnaire"},{role:"Basic User"},{role:"Intermedia User"},{role:"Expert User"}])
        }
        const adminId=await role.findOne({role:"Admin"})

        const userOne=await user.find({role:adminId._id})

      

        if (userOne.length==0){
            

            await user.create({

                firstName:"Admin",
                lastName:"Admin",
                age:"30",
                email:"Admin@gamail.com",
                password:bcryptjs.hashSync("Admin1998A/",10),
                role:adminId._id        

            })
        }



        

    console.log("table role and user created")
        
    } catch (error) {
        
        console.error(error)
    }
}

module.exports=setup