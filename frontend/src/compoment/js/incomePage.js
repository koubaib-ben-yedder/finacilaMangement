import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomTable from "../../customCompoment/js/customTable";
import "../css/income.css";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../customCompoment/js/customModal";
import axios from "axios";
import {
  trigger,
  display,
  errorHandler,
  filterData,
  notification,
} from "../../redux/action";
import { Form, InputGroup } from "react-bootstrap";
const Income = () => {


  const [id, setId] = useState(-1);
  const varaibleTrigger = useSelector((state) => state.trigger);
  const { pageUrl } = useSelector((state) => state);
  const [oneData, setOneData] = useState("");
  const modelRef = useRef();
  const [data, setData] = useState("");

  console.log(varaibleTrigger);
  const { error, status, pageNumber, findValue, errorGroup } = useSelector(
    (state) => state
  );
  console.log(pageNumber, findValue);

  const getIncome = async () => {
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
        },
      };
      console.log(pageUrl + "/income/getIncome/" + pageNumber + "");

      const { data,status } = await axios.get(
        pageUrl + "/income/getIncome/" + pageNumber + "",
        config
      );

      setData(data);
      dispatch(notification({errorNot:data.msg,status:status}))
    
    } catch (error) {
      const { response } = error;

      if (typeof (response.data.msg) != "undefined") {
        console.log(
          response.data,
          response.status == 400 && Object.keys(response.data).includes("msg")
        );
        if (
          response.status == 400 &&
          Object.keys(response.data).includes("msg")
        ) {
          dispatch(
            notification({
              errorNot: response.data.msg,
              status: response.status,
            })
          );
          console.log(error);
        }
        console.log(error);
      }
    }
  };

  const dispatch = useDispatch();
  const del = async (e, id) => {
    console.log("delete income", id);

    e.preventDefault();

    console.log("---", id);

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
          "Content-Type": "application/json",
        },
      };

      const { data, status } = await axios.delete(
        pageUrl + "/income/deleteIncome/" + id,
        config
      );
      dispatch(notification({errorNot:data.msg,status:status}))


      setData(data);
      dispatch(trigger());
    } catch (error) {
      const { response } = error;
      if (
        response.status == 400 &&
        Object.keys(response.data).includes("msg")
      ) {
        dispatch(
          notification({ errorNot: response.data.msg, status: response.status })
        );
      }

      console.log(error);
    }
  };

  const add = () => {
    console.log("add income");
    dispatch(errorHandler({ error: [] }));
    dispatch(display({ show: true, page: "Income" }));
    setId(-1);
  };
  const update = (id) => {
    console.log("update income", id);
    dispatch(errorHandler({ error: [] }));

    setId(id);
    dispatch(display({ show: true, page: "Income" }));
  };
  const find = async (e, id) => {
    e.preventDefault();

    console.log("---", id);

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
          "Content-Type": "application/json",
        },
      };

      const { data, status } = await axios.get(
        pageUrl + "/income/getOneIncome/" + id,
        config
      );
      dispatch(notification({errorNot:data.msg,status:status}))


      setOneData(data);
      dispatch(display({ show: true, page: "View" }));
      dispatch(trigger());
    } catch (error) {
      const { response } = error;
      if (
        response.status == 400 &&
        Object.keys(response.data).includes("msg")
      ) {
        dispatch(
          notification({ errorNot: response.data.msg, status: response.status })
        );
      }
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(notification({errorNot:"",status:0}))

    getIncome();
    dispatch(errorHandler({ error: [] }));
  }, [varaibleTrigger, pageUrl, pageNumber]);
  useEffect(()=>{
    dispatch(notification({errorNot:"",status:0}))
  },[] )

  useEffect(() => {
    dispatch(filterData({ pageNumber: 1, findValue: "" }));
  }, [pageUrl]);

  return (
    <div className="income">
      <div className="income-content-search">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <i class="fa-solid fa-magnifying-glass"></i>
          </InputGroup.Text>
          <Form.Control
            placeholder="search:"
            aria-label="search:"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              dispatch(
                filterData({
                  pageNumber: pageNumber,
                  findValue: e.target.value,
                })
              );
            }}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <i class="fa-solid fa-arrow-up-1-9"></i>
          </InputGroup.Text>
          <Form.Control
            placeholder="page number:"
            aria-label="page number:"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              dispatch(
                filterData({ pageNumber: e.target.value, findValue: findValue })
              );
              console.log(e.target.value);
            }}
          />
        </InputGroup>
      </div>
      <CustomTable
        del={del}
        add={add}
        update={update}
        find={find}
        index={"income"}
        
        data={data}
        filter={findValue}
      />

      <CustomModal oneData={oneData} choix={"income"} id={id} />
    </div>
  );
};

export default Income;
