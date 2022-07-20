import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import "../css/singUp.css"
const SingUp = () => {
    
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [age,setAge]=useState("")
    const navigate=useNavigate()
    const [data,setData]=useState("")

    const send=async(e)=>{
       
        e.preventDefault();
     
  
      
        try {
            
            const config={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const dataToSend={"firstName":firstName,"lastName":lastName,"email":email,"password":password,"age":age}
            console.log(dataToSend)
            const {data}=await axios.post(`http://localhost:5000/addUser`,dataToSend,config)
           
            setData(data)
          
           
            
            navigate("/login")

            
        } catch (error) {

          
            
            console.error(error)
            
        }
      
     

    }
  return (
    
    
    <div className="singUp">
        
    <div className="singUp-content">
    <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} />
                       
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>
                  
        
                    <Form.Group className="mb-3" >
                        <Form.Label>firstName:</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setFirstName(e.target.value)} />
                       
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>lastName:</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setLastName(e.target.value)} />
                    </Form.Group>
                  
        
            
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>age:</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setAge(e.target.value)} />
                        
                    </Form.Group>

                  
            </Form>
                <div className="singUp-content-footer">
                        
                    <Button variant="outline-success" type="submit"onClick={(e)=>send(e)}>
                            conform
                    </Button>
                    <Button variant="outline-danger">Reset</Button>

                </div>
                
                  
                
            </div>
    </div>
  )
}

export default SingUp