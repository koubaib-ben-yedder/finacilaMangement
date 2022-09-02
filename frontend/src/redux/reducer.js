import {createSlice} from "@reduxjs/toolkit"
import {show,tableTrigger,notif,url,error,filter,anim} from "./actionType"


const reducer=(state={show:false,page:"",trigger:0,status:0,error:[],errorNot:"",errorDescription:[],errorGroup:[],imageUrl:"",pageUrl:"",pageNumber:1,findValue:""},action)=>{
    console.log(action.payload)
    

    // eslint-disable-next-line default-case
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
            console.log(action.payload)
          
            
            if(action.payload.errorGroup!=undefined ){    
                
                console.log(state.errorGroup.includes(action.payload.errorGroup),state.errorGroup)

                if(state.errorGroup.includes(action.payload.errorGroup)==false){

                    return {
                        ...state,status:action.payload.status,errorGroup:[...state.errorGroup,action.payload.errorGroup]
                    }  

                }
                
              
           
        
            }else{
              
                    return {
                        ...state,errorNot:action.payload.errorNot,status:action.payload.status
                    }  
                
                    
            }   

            return {
                ...state
            }  
        
        
            
        case url:

            return{
                ...state,imageUrl:action.payload.imageUrl,pageUrl:action.payload.pageUrl

            }
        case error:

            return {
                ...state,errorDescription:action.payload.error
            }
        case filter:

            return{
                
                ...state,pageNumber:action.payload.pageNumber,findValue:action.payload.findValue
            }
          
    
        default:

            return state

        
    }
  



}

export default reducer