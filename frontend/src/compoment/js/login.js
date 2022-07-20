import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "../css/login.css"
import { useNavigate } from 'react-router-dom'
const Login = () => {
  
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

 const navigate=useNavigate()

  
  const send=async(e)=>{
       
    e.preventDefault();
  

  
    try {
        
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const dataToSend={"email":email,"password":password}
      
        const {data}=await axios.post(`http://localhost:5000/login`,dataToSend,config)
       
        localStorage.setItem("webtoken",data?.msg)

        


        navigate("/")
      
     
       
        
    } catch (error) {
    

        
        console.error(error)
        
    }
  
 

}
  return (
    <div className="login">

       <div className="login-content"> 
            <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
               
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Control type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <div className="login-content-footer">
                   
                <Button variant="outline-success" type="submit" onClick={(e)=>send(e)}>
                    Submit
                </Button>
                <Button variant="outline-danger">Danger</Button>{' '}
            </div>
        
         </div>
    </div>
  )
}

export default Login