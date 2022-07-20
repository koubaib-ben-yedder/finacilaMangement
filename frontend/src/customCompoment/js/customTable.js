import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { display } from '../../redux/action';
import "../css/customTable.css"
import CustomModal from './customModal';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
const  CustomTable=({del,find,add,update,index,data})=> {

    const list=["1","2","3","4","5","6","7","8","9","10","11"]
    
   const {show}=useSelector((state)=>state)
  
    
    const dispatch=useDispatch()

    console.log(data)
    
    
  
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
                        {Array.isArray(data)?data?.map((el,index)=>(
                    
                

                        
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

                    {Array.isArray(data)?data?.map((el,index)=>(

                        
                    <tbody>
                        <tr>
                        <   td>{index}</td>
                            <td>{el.descriptionFactor}</td>
                            <td>{el.client}</td>
                            <td>  <img   className="customCardY-card-image" src={"http://localhost:5000/static/"+el.imageFactor}/></td>
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