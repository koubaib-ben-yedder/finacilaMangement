import {createSlice} from "@reduxjs/toolkit"
import {show,tableTrigger,notif} from "./actionType"


const reducer=(state={show:false,page:"",trigger:0,status:0,error:""},action)=>{
    console.log(action.payload)
    

    switch(action.type){
        case show :
            return{
                ...state,show:action.payload.show,page:action.payload.page
    
            }
            case tableTrigger:

            return{
                ...state,trigger:state.trigger+1
            }
            case notif:
               return {
                    ...state,error:action.payload.error,status:action.playload.status
                }
    }
  

    return state

}

export default reducer