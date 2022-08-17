import React, { useEffect, useState } from "react";
import CustomCalendar from "../../customCompoment/js/customCalendar";
import CustomCardX from "../../customCompoment/js/customCardX";
import CustomCardY from "../../customCompoment/js/customCardY";
import { useSelector, useDispatch } from "react-redux";
import { Accordion, Form, InputGroup } from "react-bootstrap";
import Client from "./clientPage";
import "../css/mainPage.css";
import axios from "axios";
import { errorHandler, filterData, notification } from "../../redux/action";

const Main = () => {
  const [factor, setFactor] = useState("");
  const [income, setIncome] = useState("");
  const [client, setClient] = useState("");
  const dispatch = useDispatch();
  const { pageUrl, pageNumber, findValue, errorGroup } = useSelector(
    (state) => state
  );

  
  const getIncome = async () => {
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
        },
      };
      const { data,status } = await axios.get(
        pageUrl + "/income/getIncome/" + pageNumber + "",
        config
      );
      dispatch(notification({errorNot:data.msg,status:status}))

      setIncome(data);
    } catch (error) {
      const { response } = error;

      if (typeof response.data.msg != "undefined") {
        if (
          response.status == 400 &&
          Object.keys(response.data).includes("msg")
        ) {
          dispatch(
            notification({
              errorGroup: response.data.msg,
              status: response.status,
            })
          );
        }
      }
    }
  };

  const getFactor = async () => {
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
        },
      };
      const { data,status } = await axios.get(
        pageUrl + "/factor/getFactor/" + pageNumber + "",
        config
      );
      dispatch(notification({errorNot:data.msg,status:status}))

      setFactor(data);
    } catch (error) {
      const { response } = error;

      if (typeof response.data.msg != "undefined") {
        if (
          response.status == 400 &&
          Object.keys(response.data).includes("msg")
        ) {
          dispatch(
            notification({
              errorGroup: response.data.msg,
              status: response.status,
            })
          );
        }
        console.log(error);
      }
    }
  };

  useEffect(() => {
    dispatch(notification({errorNot:"",status:0}))
    getFactor();
    getIncome();
  }, [pageNumber, pageUrl]);
  
  useEffect(()=>{
 
      dispatch(notification({errorNot:"",status:0}))
   
  
  },[])

  useEffect(() => {
    dispatch(filterData({ pageNumber: 1, findValue }));
  }, [pageUrl]);

  return (
    <div classname="main-page">
      <div className="main-page-content">
        <CustomCalendar />

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
                    pageNumber: e.target.value,
                    findValue: findValue,
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
                  filterData({
                    pageNumber: e.target.value,
                    findValue: findValue,
                  })
                );
              }}
            />
          </InputGroup>
        </div>

        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Factor To Pay</Accordion.Header>
            <Accordion.Body>
              {factor != undefined ? (
                <CustomCardY data={factor} filter={findValue} />
              ) : (
                ""
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Income To Have</Accordion.Header>
            <Accordion.Body>
              {income != undefined ? (
                <CustomCardX data={income} filter={findValue} />
              ) : (
                ""
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Client</Accordion.Header>
            <Accordion.Body>
              {console.log(window.location.pathname)}
              <Client />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default Main;
