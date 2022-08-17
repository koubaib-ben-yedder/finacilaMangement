import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../css/login.css";
import { useSelector, useDispatch } from "react-redux";
import { errorHandler, notification } from "../../redux/action";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageUrl, errorDescription } = useSelector((state) => state);

  const send = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const dataToSend = { email: email, password: password };

      const { data,status } = await axios.post(pageUrl + "/login", dataToSend, config);

      console.log(data);

      if (data.webtoken != undefined) {
        localStorage.setItem("webtoken", data?.webtoken);
      }
      dispatch(notification({errorNot:data.msg,status:status}))

      dispatch(errorHandler({ error: [] }));      

      navigate("/");
    } catch (error) {
      const { response } = error;
      console.log(response.status);
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
 

  }, [dispatch]);
  useEffect(()=>{
    dispatch(notification({ errorNot:"" ,status: 0 }));
  },[])
  return (
    <div className="login">
      <div className="login-content">
        <Form.Group className="mb-3">
          <Form.Control
            className="mb-1"
            type="email"
            placeholder="email"
            onChange={(e) =>{          
              
            dispatch(notification({errorNot:"",status:0}))
            setEmail(e.target.value)
            
          }}
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
          <Form.Control
            className="mb-1"
            type="password"
            placeholder="password"
            onChange={(e) =>{         
                
              dispatch(notification({errorNot:"",status:0}))
              setPassword(e.target.value)
            
            }}
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
        </Form.Group>
        <div className="login-content-footer">
          <Button
            variant="outline-success"
            type="submit"
            onClick={(e) => send(e)}
          >
            Ok
          </Button>
          <Button variant="outline-danger">Reset</Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
