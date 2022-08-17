import axios from "axios"
import {show,tableTrigger,notif,url,error,filter,anim}  from "./actionType"

export const display=(data)=>{

   

    return{
        type:show,
        payload:data
      
    }
    
}


export const trigger=()=>{

    return{
        type:tableTrigger,
       
    }

}
export const notification=(data)=>{
    return {
        type:notif,
        payload:data  
    }
}

export const urlFliper=()=>async(dispatch)=>{
   
    if(window.location.origin.substring(7,16)=="localhost"){
      
        try {
          const {data}=await axios.get("http://localhost:5000/baseUrl/developoment")
  
          console.log(data.pageUrl, data.imageUrl)

          dispatch({
            
            type:url,
            payload:data

          })
     
        } catch (error) {
       
          console.log(error)
        }
      }else{
  
       
        try {      
          const {data}=await axios.get("http://localhost:5000/baseUrl/production")
          
          console.log(data)
          
          
        
         
          dispatch({
            
            type:url,
            payload:data

          })
    
        } catch (error) {
   
          console.log(error)
        }
      }
     
    

}
export const errorHandler=(data)=>{
  console.log(error)

  return{

    type:error,
    payload:data
  }

}

export const filterData=(data)=>{
  return{
    type:filter,
    payload:data
  }
}

