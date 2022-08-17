const {getClient,getOneClient,updateClient,deleteClient,addClient}=require("../controllers/client.controller")
const express=require("express")
const clientRouter=express.Router()
const {validateClient,validationClient}=require("../middlewares/validator/client.validater")
clientRouter.get("/getClient/:pageNumber",getClient)
clientRouter.get("/getOneClient/:id",getOneClient)
clientRouter.post("/addClient",validateClient,validationClient,addClient)
clientRouter.delete("/deleteClient/:id",deleteClient)
clientRouter.put("/updateClient/:id",validateClient,validationClient,updateClient)

module.exports=clientRouter