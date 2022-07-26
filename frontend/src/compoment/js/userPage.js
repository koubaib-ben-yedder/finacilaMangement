import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/userPage.css";
import { useDispatch, useSelector } from "react-redux";
import { display, trigger } from "../../redux/action";
import CustomModal from "../../customCompoment/js/customModal";
import { Navigate, useNavigate } from "react-router-dom";
const User = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [id, setId] = useState(-1);
  const navigate = useNavigate();

  const triggerVariable = useSelector((state) => state.tigger);

  const getUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
        },
      };
      const { data, status } = await axios.get(
      window.location.origin + "/user/getOneUser",
        config
      );
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const update = (id) => {
    console.log("update factor");
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
      await axios.delete(window.location.origin + "/user/deleteUser", config);
      navigate("/singup");
      dispatch(trigger());

      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [triggerVariable]);
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
