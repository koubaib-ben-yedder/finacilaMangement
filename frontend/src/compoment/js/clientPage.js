import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomCardXY from '../../customCompoment/js/customCardXY'
import { display, trigger } from '../../redux/action'
import axios from "axios"
import CustomModal from '../../customCompoment/js/customModal'
import "../css/clientPage.css"
const Client = () => {

    
  const [data,setData]=useState()
  const [id,setId]=useState(-1)
  const varaibleTrigger=useSelector((state)=>state.trigger)
  const [oneData,setOneData]=useState("")
 
  console.log(varaibleTrigger)
    const getClient=async()=>{
      try {

        const config={
          headers:{
            Authorization:localStorage.getItem("webtoken")

          }
        }
        const {data}=await axios.get('http://localhost:5000/client/getClient',config)

      
        setData(data)
        
      
        
    
        
      } catch (error) {
    
        console.log(error)
        
      }
      
    }
    
    useEffect(()=>{

      getClient()

    },[varaibleTrigger])
    const dispatch=useDispatch()
    const del=async(e,id)=>{
      
      
      e.preventDefault()
      
      
    
      try {
          
          const config={
            headers:{
              "Authorization":localStorage.getItem("webtoken"),
              "Content-Type":"application/json"
            }
          }
        
          const {data}=await axios.delete(`http://localhost:5000/client/deleteClient/${id}`,config) 
          
          setData(data)
            
          dispatch(trigger())
        
      } catch (error) {
       
        console.error(error)
          
      }

    }
    
    const add=()=>{
     
      dispatch(display({show:true,page:"Client"}))
      setId(-1)
    }
    const update=(id)=>{
    
      setId(id)
      dispatch(display({show:true,page:"Client"}))

    }
    const find=async(e,id)=>{


      e.preventDefault()
      
     
    
      try {
          
          const config={
            headers:{
              "Authorization":localStorage.getItem("webtoken"),
              "Content-Type":"application/json"
            }
          }
        
          const {data}=await axios.get(`http://localhost:5000/client/getOneclient/${id}`,config)

      
          dispatch(display({show:true,page:"View"}))
          setOneData(data)
      } catch (error) {
         
        console.error(error)
          
          
      }
    }
  return (
    <div>
      <CustomCardXY field={["firstname","lastname","age","job"]} del={del} add={add} data={data} update={update} find={find} y={3}/>
      <CustomModal id={id} choix={"Client"}oneData={oneData} />

    </div>
  )
}

export default Client