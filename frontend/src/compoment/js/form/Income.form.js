import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { notification, trigger } from '../../../redux/action'
import axios from "axios"
import gsap from 'gsap'
import CustomAlert from '../../../customCompoment/js/customAlert'
const IncomeForm = ({handleClose,id}) => {

  const [nameIncome,setNameIncome]=useState("")
  const [descriptionIncome,setDescriptionIncome]=useState("")
  const [dateIncome,setDateIncome]=useState("")
  const [manyToHave,setManyToHave]=useState("")
  const [remainIncome,setRemainIncome]=useState("")
  const [data,setData]=useState("")
  const varaibleTrigger=useSelector((state=>state.trigger))
  const {error,status}=useSelector((state)=>state)

  const modelRef=useRef()
  const [play,setPaly]=useState(0)
  console.log(useSelector((state=>state.trigger)))

  const dispatch=useDispatch()
  console.log("--------------------------",nameIncome,descriptionIncome,dateIncome,manyToHave,remainIncome)
  
  const send=async(e)=>{
      e.preventDefault();
   
      console.log("*")  
    
      try {
          
          const config={
              headers:{
                  "Authorization":localStorage.getItem("webtoken"),
                  "Content-Type":"application/json"
              }
          }
          setPaly(1)
          const dataToSend={"nameIncome":nameIncome,"descriptionIncome":descriptionIncome,"dateIncome":dateIncome,"manyToHave":manyToHave,"remainIncome":remainIncome}
          const {data}=await axios.post(`http://localhost:5000/income/addIncome`,dataToSend,config)
          setData(data)
        
  
          dispatch(trigger())
          
        
          
       
          
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
                  "Content-Type":"application/json"
              }
          }
          setPaly(1)
          const dataToSend={"nameIncome":nameIncome,"descriptionIncome":descriptionIncome,"dateIncome":dateIncome,"valueToPay":manyToHave,"remainIncome":remainIncome}
          const {data}=await axios.put(`http://localhost:5000/income/updateIncome/${id}`,dataToSend,config)
        setData(data)
        dispatch(trigger())
      
          
      } catch (error) {
     
          console.error(error)
          
      }
    
  }
  const flipe=async(id,e)=>{
   
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
            <Modal.Title> {id===-1?"Add Income":"Update Income"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Income name:</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setNameIncome(e.target.value)} />
                
                </Form.Group>  

                <Form.Group className="mb-3">
                    <Form.Label>Income description:</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setDescriptionIncome(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Income date:</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setDateIncome(e.target.value)}  />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Many to have:</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setManyToHave(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Income remain:</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setRemainIncome(e.target.value)}  />
                </Form.Group>
                
            </Form>
         </Modal.Body>
               
       
        <Modal.Footer>
          <Button  variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant={id==-1?"outline-success":"outline-primary"} onClick={async(e)=>{await flipe(id,e)}}>
            {id==-1?"send":"update"}
          </Button>
        </Modal.Footer>
    </div>
  )
}

export default IncomeForm