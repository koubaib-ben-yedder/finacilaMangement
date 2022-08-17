import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomCardXY from "../../customCompoment/js/customCardXY";
import {
  display,
  errorHandler,
  trigger,
  filterData,
  notification,
} from "../../redux/action";
import axios from "axios";
import CustomModal from "../../customCompoment/js/customModal";
import "../css/clientPage.css";
import { Form, InputGroup } from "react-bootstrap";
const Client = ({ place }) => {
  const [data, setData] = useState();
  const [id, setId] = useState(-1);
  const varaibleTrigger = useSelector((state) => state.trigger);
  const { pageUrl, pageNumber, findValue,errorNot} = useSelector((state) => state);
  const [oneData, setOneData] = useState("");

  console.log(varaibleTrigger);
  const getClient = async () => {
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
        },
      };
      const { data,status } = await axios.get(
        pageUrl + "/client/getClient/" + pageNumber + "",
        config
      );
      dispatch(notification({errorNot:data.msg,status:status}))

      setData(data);
    } catch (error) {
      const { response } = error;

      if (typeof(response.data) != "undefined") {
      
        if (
          response.status == 400 &&
          Object.keys(response.data).includes("msg")
        ) {
          console.log(response.data.msg);
          dispatch(
            notification({
              errorNot: response.data.msg,
              errorGroup: response.data.msg,
              status: response.status,
            })
          );
          console.log(errorNot);

        }
      }

      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(filterData({ pageNumber: 1, findValue: "" }));
  }, [pageUrl]);
  useEffect(() => {
    dispatch(notification({errorNot:"",status:0}))
    getClient();
  }, [varaibleTrigger, pageUrl, pageNumber]);

  const dispatch = useDispatch();
  const del = async (e, id) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
          "Content-Type": "application/json",
        },
      };

      const { data,status } = await axios.delete(
        pageUrl + "/client/deleteClient/" + id,
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
        console.log()
        dispatch(
          notification({ errorNot: response.data.msg, status: response.status })
        );
      }

      console.log(error);
    }
  };

  const add = () => {
    dispatch(errorHandler({ error: [] }));

    dispatch(display({ show: true, page: "Client" }));
    setId(-1);
  };
  const update = (id) => {
    setId(id);
    dispatch(errorHandler({ error: [] }));

    dispatch(display({ show: true, page: "Client" }));
  };
  const find = async (e, id) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
          "Content-Type": "application/json",
        },
      };

      const { data,status } = await axios.get(
        pageUrl + "/client/getOneclient/" + id,
        config
      );
      dispatch(notification({errorNot:data.msg,status:status}))

      dispatch(display({ show: true, page: "View" }));
      setOneData(data);
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

  return (
    <div>
      {place != "mainPage" ? (
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
                  filterData({
                    pageNumber: e.target.value,
                    findValue: findValue,
                  })
                );
              }}
            />
          </InputGroup>
        </div>
      ) : (
        ""
      )}

      <CustomCardXY
        field={["firstname", "lastname", "age", "job"]}
        del={del}
        add={add}
        data={data != undefined ? data : ""}
        update={update}
        find={find}
        y={3}
        filter={findValue}
      />

      <CustomModal id={id} choix={"Client"} oneData={oneData} />
    </div>
  );
};

export default Client;
