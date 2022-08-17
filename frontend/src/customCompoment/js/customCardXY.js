import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../css/customCardXY.css"
const customCardXY = ({field,y,del,find,update,add,data,filter}) => {
  console.log(typeof(data))
  return (
    <div >
        <div className="customCardXY-icon-add"><i class="fas fa-plus-circle" onClick={()=>add()} ></i></div>

        <Row xs={1} md={y} className="g-4">
      {Array.isArray(data)?filter!=""?data?.filter((el)=>Object.values(el).join().indexOf(filter)!=-1?el:"").map((el,index)=>(
        <Col>
          <Card key={index}>
            <Card.Header>     
           
            
             <div className="customCardXY-header"><i class="fas fa-plus-circle" onClick={()=>add()} ></i><i class="fas fa-trash-alt" onClick={(e)=>del(e,el._id)}></i><i class="fas fa-pen" onClick={async()=>await update(el._id)} ></i><i class="fas fa-eye" onClick={(e)=>find(e,el._id)}></i></div>

            </Card.Header>
            <Card.Body>
              
              <Card.Title>
                
                   
                <div>{el.firstName}</div>
                <div>{el.lastName}</div>
                
              </Card.Title>
             
              <Card.Text>
                <div className="customCardXY-body">
                    <div className="customCardXY-body-left">
                       
                        <div>age:{el.age}</div>
                        <div>job:{el.job}</div>
                    </div>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )):data.map((el,index)=>(
        <Col>
          <Card key={index}>
            <Card.Header>     
           
            
             <div className="customCardXY-header"><i class="fas fa-plus-circle" onClick={()=>add()} ></i><i class="fas fa-trash-alt" onClick={(e)=>del(e,el._id)}></i><i class="fas fa-pen" onClick={async()=>await update(el._id)} ></i><i class="fas fa-eye" onClick={(e)=>find(e,el._id)}></i></div>

            </Card.Header>
            <Card.Body>
              
              <Card.Title>
                
                   
                <div>{el.firstName}</div>
                <div>{el.lastName}</div>
                
              </Card.Title>
             
              <Card.Text>
                <div className="customCardXY-body">
                    <div className="customCardXY-body-left">
                       
                        <div>age:{el.age}</div>
                        <div>job:{el.job}</div>
                    </div>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>)):<>{data?.msg}</>}
    </Row>

    </div>
  )
}

export default customCardXY