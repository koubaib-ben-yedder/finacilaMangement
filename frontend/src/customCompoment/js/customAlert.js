import React from 'react'
import { Button, Card } from 'react-bootstrap'
import "../css/customAlert.css"
const CustomAlert = ({error,status}) => {
  
    console.log("-------------",error,status)
      return (
        <div className="customAlert">
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
                  {status==200 || status==400?error.msg:"server down" }
                  XQXQDD
                </Card.Text>
              </Card.Body>
            </Card>
        </div>
      )

 

   
 
 
}

export default CustomAlert