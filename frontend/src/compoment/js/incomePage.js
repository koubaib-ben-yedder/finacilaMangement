import React, { useEffect, useRef, useState } from 'react'
import CustomTable from '../../customCompoment/js/customTable'
import "../css/income.css"
import { useDispatch, useSelector } from 'react-redux'
import { display } from '../../redux/action'
import CustomModal from '../../customCompoment/js/customModal'
import axios from "axios"
import { trigger,notification } from '../../redux/action'
import CustomAlert from '../../customCompoment/js/customAlert'
import gsap from 'gsap'
const Income = () => {
  const list=["1","2","3","4","5","6","7","8","9","10","11"]


  const [id,setId]=useState(-1)
  const varaibleTrigger=useSelector((state)=>state.trigger)
  const [oneData,setOneData]=useState("")
  const modelRef=useRef()
  const [data,setData]=useState("")
  console.log(varaibleTrigger)
  const {error,status}=useSelector((state)=>state)
  console.log(error,status)

 
  const getIncomeData=async()=>{
    try {

      const config={ 
        headers:{
          Authorization:localStorage.getItem("webtoken")

        }
      }
      const {data}=await axios.get(''+window.location.origin+'/income/getIncome',config)
      console.log(await axios.get('http://localhost:5000/income/getIncome',config))
   
     setData(data)
     
     
    } catch (error) {
      

   
      console.log(error)
      
    }
    
  }
  
  useEffect(()=>{

    getIncomeData()
 
  },[varaibleTrigger])
  const dispatch=useDispatch()
  const del=async(e,id)=>{
    console.log("delete income",id)
    
    e.preventDefault()
     
    console.log("---",id)
  
    try {
        
        const config={
          headers:{
            "Authorization":localStorage.getItem("webtoken"),
            "Content-Type":"application/json"
          }
        }
      
       const {data,status}=await axios.delete(`${window.location.origin}/income/deleteIncome/${id}`,config)
      
      
        dispatch(trigger())
        setData(data)
    
    
    } catch (error) {
   
      console.error(error)
        
    }
 

  }
 
  
  const add=()=>{
    console.log("add income")
    dispatch(display({show:true,page:"Income"}))
    setId(-1)
  }
  const update=(id)=>{
    console.log("update income",id)
    setId(id)
    dispatch(display({show:true,page:"Income"}))

  }
  const find=async(e,id)=>{


    e.preventDefault()
     
    console.log("---",id)
  
    try {
        
        const config={
          headers:{
            "Authorization":localStorage.getItem("webtoken"),
            "Content-Type":"application/json"
          }
        }
      
        const {data,status}=await axios.get(`${window.location.origin}/income/getOneIncome/${id}`,config)
        
        setOneData(data)
        dispatch(display({show:true,page:"View"}))
       
   
      
      
    } catch (error) {
    
      console.error(error)
        
        
    }
  }
  return (
    <div className="income">
      
      <CustomTable del={del} add={add} update={update} find={find} index={"income"} title={["Income  name ","Income description","Income date","Many to have","Income remai"]} data={data} />
    
      <CustomModal oneData={oneData} choix={"income"} id={id}/>
      
     
      
    </div>
  )
}

export default Income