import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "../css/userPage.css";
import { useDispatch, useSelector } from "react-redux";
import { display, errorHandler, trigger,notification } from "../../redux/action";
import CustomModal from "../../customCompoment/js/customModal";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const User = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { pageUrl } = useSelector((state) => state);
  const [id, setId] = useState(-1);

  const navigate = useNavigate();
  const anim=useRef(null)
  const triggerVariable = useSelector((state) => state.tigger);
  const {errorGroup} =useSelector((state) => state.error);
 
  
  const getUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
        },
      };
      const { data, status } = await axios.get(
        pageUrl + "/user/getOneUser",
        config
      );
      console.log(data, pageUrl);
      dispatch(notification({errorNot:data.msg,status:status}))

      setData(data);
    } catch (error) {
      const {response}=error
      if (response.status == 400 && Object.keys(response.data).includes("error")) {
        dispatch(errorHandler({ error: [] }));      
        dispatch(errorHandler(response.data));
       }else{
      
        if (response.data.msg!=undefined){
          alert(response.data.msg)
          if(response.status == 400 && Object.keys(response.data).includes("msg") ){
            dispatch(errorHandler({ error: [] }));      

            dispatch(notification({errorNot:response.data.msg,errorGroup:response.data.msg,status:response.status}))



          }
          console.log(error)
        }
      }
      
    }
  };
  const update = (id) => {
    console.log("update factor");
     dispatch(errorHandler({ error: [] }));
    
    dispatch(display({ show: true, page: "User" }));
    setId(id);
  };

  const del = async (e, id) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
          "Content-Type": "application/json",
        },
      };
      localStorage.removeItem("webtoken");
      const {data,status}=await axios.delete(pageUrl + "/user/deleteUser", config);
      dispatch(notification({errorNot:data.msg,status:status}))

      navigate("/");
     
    } catch (error) {
      const {response}=error
    
        if(response.status == 400 && Object.keys(response.data).includes("msg") ){

          dispatch(notification({error:response.data.msg,status:response.status}))



        }
      
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    
  }, [triggerVariable, pageUrl]);


  useEffect(() => {
    dispatch(errorHandler({ error: [] }));
  

  }, [pageUrl]);

  return (
    <div className="user">
     
      <div className="user-content">
     
        <div className="user-content-firstName">
          <label>firstName:</label>
          {data?.firstName}
        </div>
        <div className="user-content-lastName">
          <label>lastName:</label>
          {data?.lastName}
        </div>
        <div className="user-content-age">
          {" "}
          <label>age:</label>
          {data?.age}
        </div>
        <div className="user-content-email">
          {" "}
          <label>email:</label>
          {data?.email}
        </div>
        <div className="user-content-password">
          {" "}
          <label>password:</label>
          {data?.password}
        </div>
        <div className="user-conetnt-icon">
          <i class="fas fa-trash-alt" onClick={(e) => del(e, data?._id)}></i>
          <i class="fas fa-pen" onClick={(e) => update(e, data?._id)}></i>
          <CustomModal />
        </div>
      </div>
    </div>
  );
};

export default User;
