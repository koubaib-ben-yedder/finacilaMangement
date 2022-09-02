import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import "../css/customAlert.css"
import {animated} from "react-spring"
const CustomAlert = ({spring}) => {
  const {errorNot,status,errorGroup}=useSelector((state)=>state)
  const [array,setArray]=useState([])
    console.log("-------------",errorNot,status,window.location.pathname,errorGroup,useSelector((state)=>state))
    
    if (errorGroup != undefined ){

      if (errorGroup.length!=0){
        
        errorGroup.map((el1,index1)=>{
          if (el1!=undefined  ){
            
        
              if ( array.includes(el1)==false){
                setArray([...array,el1])
              }
              
          
          }
        })
      
      }
    }
      if (errorNot!= undefined && errorGroup != undefined ){
        
        if (errorGroup.length!=0 || errorNot.length!=0){
          
          return (
            <animated.div style={spring} className="customAlert">
              <Card
                  bg={status==200?"success":status==400?"danger":status==500?"info":""}
                  key={"danger"} 
                  text={ 'white'}
                  style={{ width: '18rem' }}
                  className="mb-2"
                >
                  <Card.Header >{status==200?"Success":status==400?"Bad User behavour":status==500?"Server Down":""}</Card.Header>
                  <Card.Body>
                    <Card.Title> Message </Card.Title>
                    <Card.Text>
                      {array.length!=0 ?array.map((el)=>(
                        <><li>{el}</li></>
                      )):<>{errorNot}</>
                      }
                    </Card.Text>
                  </Card.Body>
                </Card>
            </animated.div>
          )

        }
        
     
      }else{
        
        
      return (
       <></>
      )
      }
  

 

   
 
 
}

export default CustomAlert