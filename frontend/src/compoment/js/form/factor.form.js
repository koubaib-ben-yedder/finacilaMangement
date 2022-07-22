import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from "axios"
import { useDispatch,useSelector } from 'react-redux'
import { tableTrigger } from '../../../redux/actionType'
import { trigger } from '../../../redux/action'
const FactorForm = ({id,handleClose}) => {

    const [descriptionFactor,setDescriptionFactor]=useState("")
    const [client,setClient]=useState("")
    const [imageFactor,setImageFactor]=useState("")
    const [dateFactor,setDateFactor]=useState("")
    const [valueToPay,setValueToPay]=useState("")
    const [remainFactor,setRemainFactor]=useState("")
    const triggerVaraible=useSelector((state)=>state.trigger)
  
    const [data,setData]=useState("")
    const dispatch=useDispatch()
  
    const send=async(e)=>{
        e.preventDefault();
     
        console.log("*")
      
        try {
            
            const config={
                headers:{
                    "Authorization":localStorage.getItem("webtoken"),
                    "Content-Type":"multipart/form-data"
                }
            }
            const dataToSend=new FormData()
            dataToSend.append("descriptionFactor",descriptionFactor)
            dataToSend.append("client",client)
            dataToSend.append("imageFactor",imageFactor)
            dataToSend.append("dateFactor",dateFactor)
            dataToSend.append("valueToPay",valueToPay)
            dataToSend.append("remainFactor",remainFactor)
            console.log(descriptionFactor,client,dateFactor,valueToPay,remainFactor,imageFactor)
           const {data}= await axios.post(""+window.location.origin+"/factor/addFactor",dataToSend,config)
           
            setData(data)
            dispatch(trigger())
            console.log(triggerVaraible)
         
         
            
        } catch (error) {
       
            console.error(error)
            
        }
    }
    const update=async(id,e)=>{
        e.preventDefault();

      
        try {
            
            const config={
                headers:{
                    "Authorization":localStorage.getItem("webtoken"),
                    "Content-Type":"multipart/form-data"
                }
            }
            const dataToSend=new FormData()
            dataToSend.append("description",descriptionFactor)
            dataToSend.append("client",client)
            dataToSend.append("imageFactor","")
            dataToSend.append("dateFactor",dateFactor)
            dataToSend.append("valueToPay",valueToPay)
            dataToSend.append("remainFactor",remainFactor)
            console.log(descriptionFactor,client,dateFactor,valueToPay,remainFactor,imageFactor)
            const {data}=await axios.put(`${window.location.origin}/factor/updateFactor/${id}`,dataToSend,config)
          
            
            setData(data)
        
            dispatch(trigger())
         
           
            
        } catch (error) {
            
        
            
            console.error(error)
            
        }
    }
    const flipe=async(id,e)=>{
        console.log("----------------------",id)
        if (id==-1){
           

          
           await send(e)

        }else{

          
          await   update(id,e)
            
        }
        handleClose()
    }
  return (
    <div>
          <Modal.Header closeButton>
            <Modal.Title>{id===-1?"Add Factor":"Upadte Factor"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form  >
                <Form.Group className="mb-3">
                    <Form.Label>Factor description:</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setDescriptionFactor(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Client:</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setClient(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Factor image:</Form.Label>
                    <Form.Control    type="file"  onChange={(e)=>setImageFactor(e.target.files[0])}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Factor date:</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setDateFactor(e.target.value) } />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Value to pay:</Form.Label>
                    <Form.Control type="text"  onChange={(e)=>setValueToPay(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Factor remain:</Form.Label>
                    <Form.Control type="text"  onChange={(e)=>setRemainFactor(e.target.value)}/>
                </Form.Group>
            </Form>
        <Modal.Footer>
          <Button  variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant={id==-1?"outline-success":"outline-primary"} onClick={async(e)=>{await flipe(id,e)}}>
            {id==-1?"send":"update"}
          </Button>
        </Modal.Footer>
           
              
       </Modal.Body>
    </div>
  )
}

export default FactorForm