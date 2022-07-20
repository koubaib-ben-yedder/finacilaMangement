import React, { useEffect, useRef, useState } from 'react'
import CustomTable from '../../customCompoment/js/customTable'
import "../css/factor.css"
import { display } from '../../redux/action'
import { useDispatch,useSelector } from 'react-redux'
import CustomModal from '../../customCompoment/js/customModal'
import axios from "axios"
import { trigger } from '../../redux/action'

const Factor = () => {

  const dispatch=useDispatch()
  

 
  
  const [data,setData]=useState([])
  const [id,setId]=useState(-1)
  const [oneData,setOneData]=useState({})
  const triggerVariable=useSelector((state)=>state.trigger)
  
  
  
 const getFactorData=async()=>{
    try {

      const config={
        headers:{
          Authorization:localStorage.getItem("webtoken")
        }
      }
     
      const {data}=await axios.get("http://localhost:5000/factor/getFactor",config)
   
      setData(data)
    } catch (error) {
    
      console.error(error)
      
    }
 }
 
  useEffect(()=>{
    getFactorData()
  },[triggerVariable])
  const add=()=>{
  
    dispatch(display({show:true,page:"Factor"}))
    setId(-1)
  }
  const update=(id)=>{
 
    dispatch(display({show:true,page:"Factor"}))
    setId(id)
  }

  const del=async(e,id)=>{
    e.preventDefault()
     
        
      
        try {
            
            const config={
              headers:{
                "Authorization":localStorage.getItem("webtoken"),
                "Content-Type":"application/json"
              }
            }
          
            const {data}=await axios.delete(`http://localhost:5000/factor/deleteFactor/${id}`,config)
            setData(data)
           
            dispatch(trigger())
          
        } catch (error) {
        
          console.error(error)
            
        }
    
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
      
        const {data}=await axios.get(`http://localhost:5000/factor/getOneFactor/${id}`,config)
      
        dispatch(display({show:true,page:"View"}))
        setOneData(data)
       
    } catch (error) {
    
      console.error(error)
        
    }
  }

  

  return (
    <div className="factor"><CustomTable del={del} add={add} update={update} find={find} title={[ "factor description ","client","factor image","factor date","Value to pay","factor remain"]} data={data}/><CustomModal id={id} oneData={oneData}/>
   
  
    </div>
  )
}

export default Factor