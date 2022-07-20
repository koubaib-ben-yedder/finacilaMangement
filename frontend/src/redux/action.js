import {show,tableTrigger,notif}  from "./actionType"

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
