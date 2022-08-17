import React from 'react'
import {CardGroup,Card} from "react-bootstrap"
const customCardX = ({data,filter}) => {

  return (
    <div >
      
      
      
        {Array.isArray(data)?data?.filter((el)=>Object.values(el).join().indexOf(filter)!=-1?el:"").map((el,index)=>(
          <CardGroup>
           <Card key={index}>
          
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