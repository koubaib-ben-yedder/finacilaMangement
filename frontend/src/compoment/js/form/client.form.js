import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { trigger } from '../../../redux/action'
import {useDispatch, useSelector} from "react-redux"
const ClientForm = ({id,handleClose}) => {

    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [age,setAge]=useState("")
    const [job,setJob]=useState("")
   
    const dispatch=useDispatch()
    const triggerVariable=useSelector((state)=>state.trigger)

    const send=async(e)=>{
        e.preventDefault();
     
        console.log("*",id)
      
        try {
            
            const config={
                headers:{
                    "Authorization":localStorage.getItem("webtoken"),
                    "Content-Type":"application/json"
                }
            }
            const dataToSend={"firstName":firstName,"lastName":lastName,"age":age,"job":job}
            console.log(dataToSend)
           const {data}= await axios.post(""+window.location.origin+"/client/addClient",dataToSend,config)
       
            dispatch(trigger())
            console.log(triggerVariable)
         
         
            
        } catch (error) {
         
            
            console.error(error)
            
        }
    }
    const update=async(e,id)=>{
     
        e.preventDefault()
      
        try {
            
            const config={
                headers:{
                    "Authorization":localStorage.getItem("webtoken"),
                    "Content-Type":"application/json"
                }
            }

            
            const dataToSend={"firstName":firstName,"lastName":lastName,"age":age,"job":job}

            const {data}=await axios.put(`${window.location.origin}/client/updateClient/${id}`,dataToSend,config)
            
            dispatch(trigger())
         
            
        } catch (error) {
           
            console.error(error)
            
        }
    }
    const flipe=async(e,id)=>{
        console.log("----------------------",e,id)
        if (id==-1){
           

          
           await send(e)

        }else{

            console.log(e)

          
          await   update(e,id)
            
        }
        handleClose()
    }
  return (
    <div>

        <Modal.Header closeButton>
            <Modal.Title>
                {id==-1?"Add Client":"Update Client"}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>First name:</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setFirstName(e.target.value)}/>
                    
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>last name:</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>age:</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setAge(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>job:</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setJob(e.target.value)}  />
                    </Form.Group>
                   

             </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button  variant="outline-danger" onClick={handleClose}>
                Close
            </Button>
            <Button variant={id==-1?"outline-success":"outline-primary"} onClick={async(e)=>await flipe(e,id)}>
                {id==-1?"Save Changes":"update"}
            </Button>
            </Modal.Footer>
    </div>
  )
}

export default ClientForm