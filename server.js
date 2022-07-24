const express=require("express")
const app=express()
const cors=require("cors")
const path =require("path")
require("dotenv").config()
const editRouter=require("./routes/edit.router")
const factorRouter=require("./routes/factor.router")
const incomeRouter=require("./routes/income.router")
const clientRouter=require("./routes/client.router")
const userRouter=require("./routes/user.router")
const publicRouter=require("./routes/public.router")
const {authentication}=require("./middlewares/authentication/authentication")
const connect=require("./connect/connectDb")
var favicon = require('serve-favicon')
const setup=require("./connect/setup")
app.use(express.json())
connect()
setup()
const port=process.env.port||8000

app.use(cors())
app.use("/edit",authentication,editRouter)
app.use("/factor",authentication,factorRouter)
app.use("/income",authentication,incomeRouter)
app.use("/client",authentication,clientRouter)
app.use("/user",authentication,userRouter)
app.use("",publicRouter)
app.set("port", port);
app.use('/static', express.static(path.join(__dirname, 'images')))

console.log(__dirname)



if(process.env.NODE_ENV == 'production') {

    app.use(express.static('frontend/build'))
  
    app.use(express.static('frontend/public/image'))
    app.get('*', function (req, res) {
        console.log("----")
        res.sendFile(path.resolve(__dirname, 'frontend','build', 'index.html'));
    })
}



    

app.listen(port,(e)=>{  
    
    if (e) throw e;
    console.log("app work in port ",port)
})
