import React from 'react'
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import "../css/customCardY.css"
const CustomCardY=({data,filter})=> {

  
    const {imageUrl}=useSelector((state)=>state)
    
    return (
    <div >
    
      {Array.isArray(data)?data?.filter((el)=>Object.values(el).join().indexOf(filter)!=-1?el:"").map((el,index)=>(
        
          <Card key={index}>
            <Card.Body>
              
              <div className="customCardY-card-body">
                
                  <div >
                    <Card.Text>
                        Factor description:{el.descriptionFactor}
                      </Card.Text>
                      <Card.Text>
                        Client{el.client}
                      </Card.Text>
                  
                      <Card.Text>
                        Factor date:s{el.dateFactor}
                      </Card.Text>
                      <Card.Text>
                        Value to pay:{el.valueToPay}
                      </Card.Text>
                      <Card.Text>
                      Factor remain:{el.remainFactor}
                      </Card.Text>
                    </div>
                    <div className="customCardY-card-body-image">
                  
                      <img   className="customCardY-card-image" src={imageUrl+"/"+el.imageFactor} onClick={()=>window.location.href=imageUrl+"/"+el.imageFactor}/>
                  </div>
                </div>
            </Card.Body>
          
            <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
          </Card>
      
      )):<>{data?.msg}</>}
 </div>
  );
}

export default CustomCardY;