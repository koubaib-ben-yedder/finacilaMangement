const income=require("../models/income.model")
const incomeUser=require("../models/incomeUser.model")
const role=require("../models/role.model")
const mongoose=require("mongoose")
const bcryptjs=require("bcryptjs")
const user=require("../models/user.model")
exports.getIncome=async(req,res)=>{

    

    try {
       
        const {email,password}=req

        const userOne=await user.findOne({email:email})
     

        if(!userOne){
            
            return res.statust(400).send({msg:"email not found"})


        }

        if(!bcryptjs.compareSync(password,userOne.password)){

            return res.status(400).send({msg:"password incorrect"})
        }
        
        const incomeUserAll=await incomeUser.find({user:userOne._id})
        
     

        const incomeAll=await income.find()
     
        let incomeTable=[]
       

            incomeUserAll.map((el1)=>{
         
                incomeAll.map((el2)=>{
                    console.log(el2,el1,el1.i,income.toString()==el2._id.toString() )
                    if(el1.income.toString()==el2._id.toString()){
    
                        incomeTable=[...incomeTable,el2]
                    }
                })
            })

            if(incomeTable.length!=0){
                return res.status(200).send(incomeTable)
            
        }else{
            return res.status(200).send({msg:"income is empty"})
        }
       


      
    } catch (error) {

        return res.status(500).send(error)
        
    }

}

exports.getOneIncome=async(req,res)=>{
    
    console.log("--")

    try {
        
        const {id}=req.params

        if(mongoose.Types.ObjectId.isValid(id)){

            const oneIncome=await income.findOne({_id:id})


            if (oneIncome){

                return res.status(200).send(oneIncome)
            }

        }


        return res.status(400).send({msg:"id dosen't exist"})
    
    } catch (error) {
        
        return res.status(500).send(error)
    }
}

exports.addIncome=async(req,res)=>{

    try {
        

       

        const addIncomeData= new income(req.body)

        await addIncomeData.save()

       

        const incomeId=(await income.find()).reverse()[0]

        
        const {password,email}=req

       

        const userOne=await user.findOne({email:email})

        console.log("--")

        if (!userOne){

            return res.stattus(400).send({msg:"email not found"})
        }
        
        
        if(!bcryptjs.compareSync(password,userOne.password)){
            
            return res.status(400).send({msg:"password incorrect"})
        }

    
        const incomeUserAdd=new incomeUser({income:incomeId._id,user:userOne._id})
        
        await incomeUserAdd.save()
        
        return res.status(200).send({msg:"income with sucess"})

    } catch (error) {

        return res.status(500).send(error)
        
    }

}

exports.deleteIncome=async(req,res)=>{

    try {

        const {id}=req.params

        if (mongoose.Types.ObjectId.isValid(id)){

            await income.findByIdAndDelete(id)

            await incomeUser.findOneAndDelete({income:id})

            return res.status(200).send({msg:"income delete with sucess"})
        }

        
    } catch (error) {
        
        
        return res.status(500).send(error)
    }

}

exports.updateIncome=async(req,res)=>{

  

    try {

        const {id}=req.params
        console.log("--")

        if(mongoose.Types.ObjectId.isValid(id)){


            await income.updateOne({_id:id},{$set:req.body})
            return res.status(200).send({msg:"income added with sucess"})

        }
       
        
    } catch (error) {

        return res.status(500).send(error)
        
    }

}