import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const UserForm= ({handleClose}) => {

    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [age,setAge]=useState("")
    const [data,setData]=useState("")
 
    const update=async(e)=>{
       
          e.preventDefault();
          console.log("-----")
    
        
          try {
              
              const config={
                  headers:{
                      "Authorization":localStorage.getItem("webtoken"),
                      "Content-Type":"application/json"
                  }
              }
              const dataToSend={"firstName":firstName,"lastName":lastName,"email":email,"password":password,"age":age}
              console.log(dataToSend)
              const {data}=await axios.put(`http://localhost:5000/user/updateUser`,dataToSend,config)
            
              setData(data)
           
            
              
          } catch (error) {
              const {response}=error
              setData(response.data)
           
              
              console.error(error)
              
          }
          handleClose()
       

      }
  return (
    <div>
         <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>

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
                    
            <Modal.Footer>
          <Button  variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
          <Button  variant="outline-success"  onClick={(e)=>update(e)}>
            save 
          </Button>
         
        </Modal.Footer>
           
              
       </Modal.Body>
    </div>
  )
}

export default UserForm