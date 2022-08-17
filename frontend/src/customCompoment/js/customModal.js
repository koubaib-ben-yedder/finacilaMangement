
import Modal from 'react-bootstrap/Modal';
import {useDispatch, useSelector } from 'react-redux';
import {display} from "../../redux/action"
import Edit from '../../compoment/js/form/edit.form';
import IncomeForm from '../../compoment/js/form/Income.form';
import FactorForm from '../../compoment/js/form/factor.form';
import ClientForm from '../../compoment/js/form/client.form';
import ViewForm from '../../compoment/js/form/view.form';
import InfoForm from '../../compoment/js/form/Info.form';
import UserForm from '../../compoment/js/form/user.form';
import "../css/customModal.css"
const CustomModal=({id,oneData,choix,info,update,send})=> {
  
 
  const {show,page}=useSelector((state)=>state)
  const {error}=useSelector((state)=>state)
  const dispatch= useDispatch()
  console.log(show,page)
  const handleClose = () => {dispatch(display({show:false,page:""}));console.log(show)}
  const HandleShow = () =>{


    
    if(page=="Edit"){

        return(
            <Edit handleClose={handleClose}/>
        )
    }else{

            if(page=="Income"){

                return(

                    <IncomeForm  id={id} handleClose={handleClose}  />

                )

                

            }else{
                        
                        if(page=="Factor"){
                            
                            return(
                                
                                <FactorForm id={id}  handleClose={handleClose} />

                            )



                        }else{

                                    if(page=="Client"){
                                        
                                        return(

                                            <ClientForm  id={id} handleClose={handleClose}/>
                                        )

                                        
                                    }else{

                                        if(page=="View"){
                                            return(
                                                
                                                <ViewForm  oneData={oneData} view={choix} handleClose={handleClose} />
                                            )
    
                                          
                                        }else{
                                            
                                            if(page=="Info"){

                                                return(
                                                    
                                                    <InfoForm infoType={info} handleClose={handleClose}/>
                                                )
                                            }else{

                                                if(  page=="User"){
                                                    return(
                                                        <UserForm  handleClose={handleClose}/>
                                                    )
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                
            

    
  

 

  return (
    <>
      

      <Modal show={show} onHide={handleClose}>
       

        <HandleShow />
            
         
      </Modal>
    </>
  );
}

export default CustomModal;