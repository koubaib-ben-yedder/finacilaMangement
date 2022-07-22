import React, { useEffect, useState } from 'react'
import CustomNavbar from '../../customCompoment/js/customNavbarBeforeLogin'
import CustomCalendar from '../../customCompoment/js/customCalendar'
import CustomCardX from "../../customCompoment/js/customCardX"
import CustomCardY from "../../customCompoment/js/customCardY"
import CustomCardXY from "../../customCompoment/js/customCardXY"
import "../../compoment/css/mainPage.css"
import { Accordion } from 'react-bootstrap'
import Client from './clientPage'
import axios from 'axios'
import Income from './incomePage'
const Main= () => {

  const [factor,setFactor]=useState("")
  const [income,setIncome]=useState("")
  const [client,setClient]=useState("")


  const getIncome=async()=>{

    try {

      const config={
        headers:{
          Authorization:localStorage.getItem("webtoken")

        }
      }
      const {data}=await axios.get(''+window.location.origin+'/income/getIncome',config)
  
      setIncome(data)
    
     
     
      
    } catch (error) {
   
      console.log(error)
      
    }
    
  
    
  }
  
  
 const getFactor=async()=>{
  
  try {

    const config={
      headers:{
        Authorization:localStorage.getItem("webtoken")
      }
    }
    const {data}=await axios.get(""+window.location.origin+"/factor/getFactor",config)
         
    setFactor(data)
    
  } catch (error) {
  
    console.error(error)
    
  }
}
const getClient=async()=>{
  try {

    const config={
      headers:{
        Authorization:localStorage.getItem("webtoken")

      }
    }
    const {data}=await axios.get(''+window.location.origin+'/client/getClient',config)

   
   setClient(data)

    
  } catch (error) {
    
    
    console.log(error)
    
  }
  
}

  useEffect(()=>{
    getFactor()
    getIncome()
    getClient()

  },[])
  return (
    <div  classname="main-page">

 
      <div className="main-page-content">
        
     
        <CustomCalendar/>

          
           
         
        <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Factor To Pay</Accordion.Header>
              <Accordion.Body>
                {factor!=undefined?<CustomCardY data={factor} />:""}

              </Accordion.Body>
            </Accordion.Item>
           
          </Accordion>
        
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Income To Have</Accordion.Header>
              <Accordion.Body>
                {income!=undefined?<CustomCardX data={income}/>:""}

              </Accordion.Body>
            </Accordion.Item>
           
          </Accordion>
             <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Client</Accordion.Header>
              <Accordion.Body>
              
                <Client />
              </Accordion.Body>
            </Accordion.Item>
           
          </Accordion>
          
          
          
                      

      

      
      </div>
    </div>
  )
}

export default Main