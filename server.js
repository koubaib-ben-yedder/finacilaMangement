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
const setup=require("./connect/setup")
app.use(express.json())
connect()
setup()
const port=process.env.port||8000
app.use(cors())

/*app.use("/edit",authentication,editRouter)
app.use("/factor",authentication,factorRouter)
app.use("/income",authentication,incomeRouter)
app.use("/client",authentication,clientRouter)
app.use("/user",authentication,userRouter)
app.use("",publicRouter)
app.set("port", port);
app.use('/static', express.static(path.join(__dirname, 'images')))
console.log(__dirname)
*/


    app.use(express.static(path.resolve(__dirname, 'frontend','build', 'index.html')))
    app.get('*', function (req, res) {
        console.log("----")
        res.sendFile(path.resolve(__dirname, 'frontend','build', 'index.html'));
      });
 

    

app.listen(process.env.port||8000,(e)=>{  
    
    if (e) throw e;
    console.log("app work in port ",port)
})