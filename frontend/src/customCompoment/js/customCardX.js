import React from 'react'
import {CardGroup,Card} from "react-bootstrap"
const customCardX = ({data}) => {

  const list=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  return (
    <div >
      
      
      
        {Array.isArray(data)?data?.map((el)=>(
          <CardGroup>
           <Card>
          
           <Card.Body>
           
             <Card.Text>
              Income name:{el.nameIncome}
             </Card.Text>
           
             <Card.Text>
              Income description:{el.descriptionIncome}
             </Card.Text>
            
             <Card.Text>
              Income date:{el.dateIncome}
             </Card.Text>
             
             <Card.Text>
              many to have:{el.manytoHave}
             </Card.Text>
            
             <Card.Text>
              Income remain:{el.nameIncome}
             </Card.Text>
           
          
           </Card.Body>
           <Card.Footer>
             <small className="text-muted">Last updated 3 mins ago</small>
           </Card.Footer>
         </Card>
         </CardGroup>
        )):<>{data?.msg}</>}
       
    
  
    </div>
  )
}

export default customCardX