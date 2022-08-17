import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../css/singUp.css";
import { errorHandler, notification } from "../../redux/action";

const SingUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountCode, setAccountCode] = useState("");
  const [valueToPay, setValueToPay] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const { pageUrl, errorDescription } = useSelector((state) => state);
  const singUp = useRef("singUp");
  const [data, setData] = useState("");
  const dispatch = useDispatch();

  const send = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      let dataToSend={}
      
      if (valueToPay==20){

        dataToSend = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          age: age,
          role:"Basic User",
          accountCode: accountCode,
          value:valueToPay,
          
        };
      }else{

        if(valueToPay==50){

          dataToSend = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            age: age,
            role:"Intermedia User",
            accountCode: accountCode,
            value:valueToPay,
          };
        }else{
          
          if(valueToPay==200){
            
            dataToSend = {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
              age: age,
              role:"Expert User",
              accountCode: accountCode,
              value:valueToPay,

              
            };
          }else{

            
          dataToSend = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            age: age,
            role:"Admin",
            accountCode: accountCode,
            value:valueToPay,

            
          };
          }

        }
      }
  
      console.log(pageUrl);
      console.log(dataToSend, window.location.origin);
      const { data,status } = await axios.post(
        pageUrl + "/addUser",
        dataToSend,
        config
      );
      dispatch(notification({errorNot:data.msg,status:status}))

      console.log(singUp);

      setData(data);
      dispatch(errorHandler({ error: [] }));      

      navigate("/login");
    } catch (error) {

      const {response}=error
      if (response.status == 400 && Object.keys(response.data).includes("error")) {
        dispatch(errorHandler({ error: [] }));      
        dispatch(errorHandler(response.data));
       }else{
        if(response.status == 400 && Object.keys(response.data).includes("msg")){
          dispatch(errorHandler({ error: [] }));      

          dispatch(notification({errorNot:response.data.msg,status:response.status}))



        }
      }
    }
      
  };
  useEffect(() => {
    dispatch(errorHandler({ error: [] }));
   
  }, [dispatch])
  return (
    <div className="singUp">
    
      <div className="singUp-content">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>firstName:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) =>{

                dispatch(notification({errorNot:"",status:0}))
                setFirstName(e.target.value)}
              }
            />

            {errorDescription
              ?.filter((el) => (el.param == "firstName" ? el : ""))
              .map((el) => (
                <Form.Text className="text-danger">
                  <>
                    <li>{el.msg}</li>
                  </>
                </Form.Text>
              ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>lastName:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) =>{ 
                
                dispatch(notification({errorNot:"",status:0}))
                setLastName(e.target.value)}}
            />

            {errorDescription
              ?.filter((el) => (el.param == "lastName" ? el : ""))
              .map((el) => (
                <Form.Text className="text-danger">
                  <>
                    <li>{el.msg}</li>
                  </>
                </Form.Text>
              ))}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>age:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) =>{ 
                
                dispatch(notification({errorNot:"",status:0})) 
                setAge(e.target.value)}}
            />

            {errorDescription
              ?.filter((el) => (el.param == "age" ? el : ""))
              .map((el) => (
                <Form.Text className="text-danger">
                  <>
                    <li>{el.msg}</li>
                  </>
                </Form.Text>
              ))}
            </Form.Group>
           
        
          <Form.Group className="mb-3">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              className="mb-1"
              type="email"
              onChange={(e) => {
                
                dispatch(notification({errorNot:"",status:0}))
                setEmail(e.target.value)}}
            />

            {errorDescription
              ?.filter((el) => (el.param == "email" ? el : ""))
              .map((el) => (
                <Form.Text className="text-danger">
                  <>
                    <li>{el.msg}</li>
                  </>
                </Form.Text>
              ))}

          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              className="mb-1"
              type="password"
              onChange={(e) => {
                dispatch(notification({errorNot:"",status:0}))
                
                setPassword(e.target.value)}}
            />

            {errorDescription
              ?.filter((el) => (el.param == "password" ? el : ""))
              .map((el) => (
                <Form.Text className="text-danger">
                  <>
                    <li>{el.msg}</li>
                  </>
                </Form.Text>
              ))}
            {console.log(errorDescription)}
          </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Acount code:</Form.Label>
              <Form.Control
                className="mb-1"
                type="text"
                onChange={(e) =>{
                  
                dispatch(notification({errorNot:"",status:0}))
                setAccountCode(e.target.value)}}
              />

              {errorDescription
                ?.filter((el) => (el.param == "accountCode" ? el : ""))
                .map((el) => (
                  <Form.Text className="text-danger">
                    <>
                      <li>{el.msg}</li>
                    </>
                  </Form.Text>
                ))}
              {console.log(errorDescription)}
          </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>value:</Form.Label>
              <Form.Control
                className="mb-1"
                type="text"
                onChange={(e) =>{
                  
                  dispatch(notification({errorNot:"",status:0}))
                  setValueToPay(e.target.value)}}
              />

              {errorDescription
                ?.filter((el) => (el.param == "value" ? el : ""))
                .map((el) => (
                  <Form.Text className="text-danger">
                    <>
                      <li>{el.msg}</li>
                    </>
                  </Form.Text>
                ))}
              {console.log(errorDescription)}

              
          
          </Form.Group>
        </Form>
        <div className="singUp-content-footer">
          <Button
            variant="outline-success"
            type="submit"
            ref={singUp}
            onClick={(e) => send(e)}
          >
            conform
          </Button>
          <Button type="reset" variant="outline-danger">Reset</Button>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
