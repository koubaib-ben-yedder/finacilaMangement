const user=require("../models/user.model")
const role=require("../models/role.model")
const bycryptjs=require("bcryptjs")
const jwt =require("jsonwebtoken")
const incomeUser=require("../models/incomeUser.model")
const income=require("../models/income.model")
const edit=require("../models/edit.model")
const editUser=require("../models/editUser.model")
const client=require("../models/client.model")
const clientUser=require("../models/clientUser.model")
const factor=require("../models/factor.model")
const factorUser=require("../models/factorUser.model")
exports.getOneUser=async(req,res)=>{

    console.log("-")

    try {

        const {email}=req
        const getUserData=await user.findOne({email:email})
        console.log(getUserData)

        if (!getUserData){

            return res.status(400).send({msg:"you email not correct or you dont have account"})
        }

        

        return res.status(200).send(getUserData)

    } catch (error) {

        return res.status(500).send(error)
        
    }

}

exports.deleteUser=async(req,res)=>{

    try {

        const {email}=req

     

        const userOne=await user.findOne({email:email})

      
        console.log("1")
        const userIncomeAll=await incomeUser.find({user:userOne._id})
       
      
        if (userIncomeAll.length!=0){

            userIncomeAll.map(async(el)=>{
                console.log(el)
                await income.findOneAndDelete({_id:el.income})
            })
        } console.log("2")
        
        await incomeUser.deleteMany({user:userOne._id})
        
        const userFactorALL=await factorUser.find({user:userOne._id})
        console.log("3")
        if (userFactorALL.length!=0){
            
          
            userFactorALL.map(async(el)=>{
                await factor.findOneAndDelete({_id:el.factor})
            })
        
        }

        await factorUser.deleteMany({user:userOne._id})
      

        const userEditAll=await editUser.find({user:userOne._id})
        
        if(userEditAll.length!=0){

           
        
            userEditAll.map(async(el)=>{
                await edit.findOneAndDelete({_id:el.edit})
            })
        }
        
        await editUser.deleteMany({user:userOne._id})
        
        const userClientAll=await clientUser.find({user:userOne._id})
       
        if(userClientAll.length!=0){

           
        
            userClientAll.map(async(el)=>{
                await client.findOneAndDelete({_id:el.client})
            })
        }
        await clientUser.deleteMany({user:userOne._id})
        

        await user.findOneAndDelete({email:email})


        return res.status(200).send({msg:"delete with sucess"})
        
    } catch (error) {

        return res.status(500).send(error)
        
    }
}

exports.updateUser=async(req,res)=>{

    try {

        const {email}=req
        console.log("------------------------",email)

        const {password}=req.body


        const userOne=await user.find({email:email})
        console.log("------------------------------",userOne,bycryptjs.hashSync(password,10))

        if(userOne.length==0){


            return res.status(400).send({msg:"email dosen't exist"})

        }
        console.log(req.body)

        await user.findOneAndUpdate({email:email},{$set:{...req.body,password:bycryptjs.hashSync(password,10)}})

        return res.status(200).send({msg:"update with sucess"})
        
    } catch (error) { 

        return res.status(500).send(error)
        
        
    }

}

exports.addUser=async(req,res)=>{

    try {

        const {password,email}=req.body

        const roleUser=await role.findOne({role:"User"})

        const userOne=await user.findOne({email:email})

        
        console.log("--")

        if(userOne){

            return res.status(400).send({msg:"email exist"})

        }
        
    
        console.log(roleUser)

        const addUserData=new user({...req.body,password:bycryptjs.hashSync(password,10),role:roleUser._id})

        await addUserData.save()

        return res.status(200).send({msg:"user added with sucess"})
        
    } catch (error) {

        return res.status(500).send(error)
    }
}

exports.login=async(req,res)=>{

    try {


        const {email,password}=req.body
       
        
        const  userData=await user.findOne({email:email})
 

        console.log("---",userData)
        console.log(email,password)
        if(!userData){

            return res.status(400).send({msg:"email dosen't exist"})
            

        }


        if(!bycryptjs.compareSync(password,userData.password)){

            console.log("--",bycryptjs.compareSync(password,userData.password))

            return res.status(400).send({msg:"password incorrect"})
            
        }
    

        const webtoken=jwt.sign({email,password},process.env.webtokenkey)

        console.log("--",email,password,userData,webtoken)

        return res.status(200).send({msg:webtoken})

        
    } catch (error) {

        
        return res.status(500).send(error)
        
    }

}