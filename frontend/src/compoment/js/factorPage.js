import React, { useCallback, useEffect, useState } from "react";
import CustomTable from "../../customCompoment/js/customTable";
import "../css/factor.css";
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

const Factor = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [id, setId] = useState(-1);
  const [oneData, setOneData] = useState({});
  const triggerVariable = useSelector((state) => state.trigger);
  const { pageUrl, findValue, pageNumber, errorGroup } = useSelector(
    (state) => state
  );
  const getFactorData = async () => {
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
      console.log(pageUrl + "/factor/getFactor");
      dispatch(notification({errorNot:data.msg,status:status}))

      setData(data);
    } catch (error) {
      const { response } = error;

      if (typeof (response.data.msg) != "undefined") {
        console.log(response.data.msg);
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
        }
        console.log(error);
      }
    }
  };

  useEffect(() => {
    dispatch(notification({errorNot:"",status:0}))

    getFactorData();
    dispatch(errorHandler({ error: [] }));
  }, [pageUrl, triggerVariable, pageNumber]);

  useEffect(() => {
    dispatch(filterData({ pageNumber: 1, findValue: "" }));
  }, [pageUrl, dispatch]);

  const add = () => {
    dispatch(errorHandler({ error: [] }));
    dispatch(display({ show: true, page: "Factor" }));
    setId(-1);
  };
  const update = (id) => {
    dispatch(errorHandler({ error: [] }));
    dispatch(display({ show: true, page: "Factor" }));
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

      const { data,status } = await axios.delete(
        pageUrl + "/factor/deleteFactor/" + id,
        config
      );
      setData(data);
      dispatch(notification({errorNot:data.msg,status:status}))

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
        pageUrl + "/factor/getOneFactor/" + id,
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
    <div className="factor">
      <div className="factor-content-search">
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
            }}
          />
        </InputGroup>
      </div>
      <CustomTable
        del={del}
        add={add}
        update={update}
        find={find}
        title={[
          "factor description ",
          "client",
          "factor image",
          "factor date",
          "Value to pay",
          "factor remain",
        ]}
        data={data}
        filter={findValue}
      />
      <CustomModal id={id} oneData={oneData} />
    </div>
  );
};

export default Factor;
