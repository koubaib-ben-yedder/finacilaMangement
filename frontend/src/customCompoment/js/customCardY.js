import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../css/customCardY.css"
const CustomCardY=({data})=> {
    const list=["1","2","3","4","5","6","7"]
    
    return (
    <div >
    
      {Array.isArray(data)?data?.map((el,idx) => (
        
          <Card>
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
                      <img   className="customCardY-card-image" src={"http://localhost:5000/static/"+el.imageFactor}/>
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