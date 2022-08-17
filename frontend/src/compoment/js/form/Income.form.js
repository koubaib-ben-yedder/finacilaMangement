import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  display,
  errorHandler,
  notification,
  trigger,
} from "../../../redux/action";
import axios from "axios";

const IncomeForm = ({ handleClose, id }) => {
  const [nameIncome, setNameIncome] = useState("");
  const [descriptionIncome, setDescriptionIncome] = useState("");
  const [dateIncome, setDateIncome] = useState("");
  const [manyToHave, setManyToHave] = useState("");
  const [remainIncome, setRemainIncome] = useState("");
  const [checkValue, setCheckValue] = useState(false);
  const [data, setData] = useState("");

  const { pageUrl, errorDescription } = useSelector((state) => state);
  console.log(useSelector((state) => state));

  const dispatch = useDispatch();

  const send = async (e) => {
    e.preventDefault();

    console.log("*");

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
          "Content-Type": "application/json",
        },
      };

      const dataToSend = {
        nameIncome: nameIncome,
        descriptionIncome: descriptionIncome,
        dateIncome: dateIncome,
        manyToHave: manyToHave,
        remainIncome: remainIncome,
      };
      console.log(errorDescription);
      const { data,status} = await axios.post(
        
        pageUrl + "/income/addIncome",
        dataToSend,
        config
      );

      setData(data);
      dispatch(notification({errorNot:data.msg,status:status}))

      dispatch(errorHandler({ error: [] }));
      dispatch(display({ show: false, page: "" }));
      dispatch(trigger());
      console.log(checkValue);
    } catch (error) {
      const { response } = error;

      console.log(Object.keys(response.data));

      if (
        response.status == 400 &&
        Object.keys(response.data).includes("error")
      ) {
        dispatch(errorHandler({ error: [] }));
        dispatch(errorHandler(response.data));
      } else {
        if (
          response.status == 400 &&
          Object.keys(response.data).includes("msg")
        ) {
          dispatch(errorHandler({ error: [] }));

          dispatch(
            notification({ errorNot: response.data.msg, status: response.status })
          );
        }
      }
    }
  };

  const update = async (id, e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
          "Content-Type": "application/json",
        },
      };

      const dataToSend = {
        nameIncome: nameIncome,
        descriptionIncome: descriptionIncome,
        dateIncome: dateIncome,
        manyToHave: manyToHave,
        remainIncome: remainIncome,
      };

      const { data,status } = await axios.put(
        pageUrl + "/income/updateIncome/" + id,
        dataToSend,
        config
      );

      setData(data);
      dispatch(errorHandler({ error: [] }));
      dispatch(display({ show: false, page: "" }));
      dispatch(notification({errorNot:data.msg,status:status}))

      dispatch(trigger());
    } catch (error) {
      const { response } = error;

      console.log(Object.keys(response.data));
      if (
        response.status == 400 &&
        Object.keys(response.data).includes("error")
      ) {
        dispatch(errorHandler({ error: [] }));
        dispatch(errorHandler(response.data));
      } else {
        if (
          response.status == 400 &&
          Object.keys(response.data).includes("msg")
        ) {
          dispatch(errorHandler({ error: [] }));

          dispatch(
            notification({ errorNot: response.data.msg, status: response.status })
          );
        }
      }
    }
  };
  const flipe = async (id, e) => {
    if (id == -1) {
      console.warn("1");
      await send(e);
    } else {
      await update(id, e);
    }
  };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title> {id === -1 ? "Add Income" : "Update Income"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="mb-4">Income name:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setNameIncome(e.target.value)}
            />

            {Array.isArray(errorDescription)
              ? errorDescription
                  .filter((el) => (el.param == "nameIncome" ? el : ""))
                  .map((el) => (
                    <Form.Text className="m-2 text-danger">
                      <li>{el.msg}</li>
                    </Form.Text>
                  ))
              : ""}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mb-4">Income description:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setDescriptionIncome(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {Array.isArray(errorDescription)
                ? errorDescription
                    .filter((el) => (el.param == "descriptionIncome" ? el : ""))
                    .map((el) => (
                      <Form.Text className="m-2 text-danger">
                        <li>{el.msg}</li>
                      </Form.Text>
                    ))
                : ""}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-4">Income date:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setDateIncome(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {Array.isArray(errorDescription)
                ? errorDescription
                    .filter((el) => (el.param == "dateIncome" ? el : ""))
                    .map((el) => (
                      <Form.Text className="m-2 text-danger">
                        <li>{el.msg}</li>
                      </Form.Text>
                    ))
                : ""}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-4">Many to have:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setManyToHave(e.target.value)}
            />
            {Array.isArray(errorDescription)
              ? errorDescription
                  .filter((el) => (el.param == "manyToHave" ? el : ""))
                  .map((el) => (
                    <Form.Text className="m-2 text-danger">
                      <li>{el.msg}</li>
                    </Form.Text>
                  ))
              : ""}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-4">Income remain:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setRemainIncome(e.target.value)}
            />

            {Array.isArray(errorDescription)
              ? errorDescription
                  .filter((el) => (el.param == "remainIncome" ? el : ""))
                  .map((el) => (
                    <Form.Text className="m-2 text-danger">
                      <li>{el.msg}</li>
                    </Form.Text>
                  ))
              : ""}
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant={id == -1 ? "outline-success" : "outline-primary"}
          onClick={async (e) => {
            await flipe(id, e);
          }}
        >
          {id == -1 ? "send" : "update"}
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default IncomeForm;
