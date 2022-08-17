
import Table from 'react-bootstrap/Table';

import "../css/customTable.css"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const  CustomTable=({del,find,add,update,index,data,filter})=> {

    const {imageUrl}=useSelector((state)=>state)
    console.log(imageUrl)
    const navigate=useNavigate()

    console.log(data,filter)
    
    
  
  return (
    
    <Table striped bordered hover>

        {index=="income"?
        
        <>
        
            
                <thead>
                        <tr>
                            <th></th>

                            <th>Income  name </th>
                            <th>Income description</th>
                            <th>Income date</th>
                            <th>Many to have</th>
                            <th>Income remain</th>
                            <th className="icon"><i class="fas fa-plus-circle" onClick={()=>add()}></i></th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {Array.isArray(data)?filter!=""?data?.filter((el)=>Object.values(el).join().indexOf(filter)!=-1?el:"").map((el,index)=>(
                    
                

                         
                            <tr>
                                <td>{index}</td>
                                {console.log(Object.values(el).join().indexOf(filter)!=-1)}
                                <td>{el.nameIncome}</td>
                                <td>{el.descriptionIncome}</td>
                                <td>{el.dateIncome}</td>
                                <td>{el.manyToHave}</td>
                                <td>{el.remainIncome}</td>
                                <td className="icon"><i class="fas fa-plus-circle" onClick={()=>add()}></i><i class="fas fa-trash-alt" onClick={async(e)=>{await del(e,el._id)}} ></i><i class="fas fa-pen" onClick={async(e)=>await update(el._id,e)}></i><i class="fas fa-eye" onClick={async(e)=>await find(e,el._id)}></i></td>
                            
                            </tr>
                         

                        )):data?.map((el,index)=>(
                            <tr>
                                <td>{index}</td>
                                <td>{el.nameIncome}</td>
                                <td>{el.descriptionIncome}</td>
                                <td>{el.dateIncome}</td>
                                <td>{el.manyToHave}</td>
                                <td>{el.remainIncome}</td>
                                <td className="icon"><i class="fas fa-plus-circle" onClick={()=>add()}></i><i class="fas fa-trash-alt" onClick={async(e)=>{await del(e,el._id)}} ></i><i class="fas fa-pen" onClick={async(e)=>await update(el._id,e)}></i><i class="fas fa-eye" onClick={async(e)=>await find(e,el._id)}></i></td>
                        
                            </tr>
                     
                        )):""}
   
                     </tbody>
        </>
            :<>

            
                <thead>
                        <tr>
                            <th></th>

                            <th>factor description </th>
                            <th>client</th>
                            <th>factor image</th>
                            <th>factor date</th>
                            <th>Value to pay</th>
                            <th>factor remain</th>
                           
                            <th className="icon"><i class="fas fa-plus-circle" onClick={()=>add()}></i></th>
                        </tr>

                    </thead>

                    {Array.isArray(data)?filter!=""?data?.filter((el)=>Object.values(el).join().indexOf(filter)!=-1?el:"").map((el,index)=>(

                        
                    <tbody>
                        <tr>
                        <   td>{index}</td>
                            {console.log(imageUrl+"/"+el.imageFactor)}
                            {console.log(Object.values(el).join().indexOf(filter)!=-1)}
                            <td>{el.descriptionFactor}</td>
                            <td>{el.client}</td>
                            <td >     <img  className="customTable-content-column-image" src={imageUrl+"/"+el.imageFactor} onClick={()=>{window.location.href=imageUrl+"/"+el.imageFactor}}/></td>
                            <td>{el.dateFactor}</td>
                            <td>{el.valueToPay}</td>
                            <td>{el.remainFactor}</td>
                            <td className="icon"><i class="fas fa-plus-circle" onClick={()=>add()}></i><i class="fas fa-trash-alt" onClick={async(e)=>await del(e,el._id)} ></i><i class="fas fa-pen" onClick={async(e)=>await update(el._id)}></i><i class="fas fa-eye" onClick={async(e)=>await find(e,el._id)}></i></td>
                    
                        </tr>
                
                    </tbody>

                        
                    )):data?.map((el,index)=>(
                        <tbody>
                        <tr>
                        <   td>{index}</td>
                            {console.log(imageUrl+"/"+el.imageFactor)}
                            {console.log(Object.values(el).join().indexOf(filter)!=-1)}
                            <td>{el.descriptionFactor}</td>
                            <td>{el.client}</td>
                            <td >     <img  className="customTable-content-column-image" src={imageUrl+"/"+el.imageFactor } onClick={()=>window.location.href=imageUrl+"/"+el.imageFactor}/></td>
                            <td>{el.dateFactor}</td>
                            <td>{el.valueToPay}</td>
                            <td>{el.remainFactor}</td>
                            <td className="icon"><i class="fas fa-plus-circle" onClick={()=>add()}></i><i class="fas fa-trash-alt" onClick={async(e)=>await del(e,el._id)} ></i><i class="fas fa-pen" onClick={async(e)=>await update(el._id)}></i><i class="fas fa-eye" onClick={async(e)=>await find(e,el._id)}></i></td>
                    
                        </tr>
                
                    </tbody>

                 
                    )):""}
            
            
            </>}
        
    </Table>
  );
}

export default CustomTable;