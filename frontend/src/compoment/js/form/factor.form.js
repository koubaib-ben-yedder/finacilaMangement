import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  display,
  errorHandler,
  trigger,
  notification,
} from "../../../redux/action";
const FactorForm = ({ id, handleClose }) => {
  const [descriptionFactor, setDescriptionFactor] = useState("");
  const [client, setClient] = useState("");
  const [imageFactor, setImageFactor] = useState("");
  const [dateFactor, setDateFactor] = useState("");
  const [valueToPay, setValueToPay] = useState("");
  const [remainFactor, setRemainFactor] = useState("");
  const triggerVaraible = useSelector((state) => state.trigger);
  const { pageUrl, errorDescription } = useSelector((state) => state);
  const [data, setData] = useState("");
  const dispatch = useDispatch();

  const send = async (e) => {
    e.preventDefault();

    console.log("*");

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
          "Content-Type": "multipart/form-data ",
        },
      };
      console.log(errorDescription);
      const dataToSend = new FormData();
      dataToSend.append("descriptionFactor", descriptionFactor);
      dataToSend.append("client", client);
      dataToSend.append("imageFactor", imageFactor);
      dataToSend.append("dateFactor", dateFactor);
      dataToSend.append("valueToPay", valueToPay);
      dataToSend.append("remainFactor", remainFactor);
      console.log(
        descriptionFactor,
        client,
        dateFactor,
        valueToPay,
        remainFactor,
        imageFactor
      );
      const { data,status} = await axios.post(
        pageUrl + "/factor/addFactor",
        dataToSend,
        config
      );

      setData(data);
      dispatch(notification({errorNot:data.msg,status:status}))

      console.log("-------------------------------");
      dispatch(errorHandler({ error: [] }));
      dispatch(display({ show: false, page: "" }));
      dispatch(trigger());
      console.log(triggerVaraible);
    } catch (error) {
      const { response } = error;
      console.log(response.status);
      console.log(data);
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
            notification({ error: response.data.msg, status: response.status })
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
          "Content-Type": "multipart/form-data",
        },
      };
      console.log(errorDescription);
      const dataToSend = new FormData();
      dataToSend.append("descriptionFactor", descriptionFactor);
      dataToSend.append("client", client);
      dataToSend.append("imageFactor", imageFactor);
      dataToSend.append("dateFactor", dateFactor);
      dataToSend.append("valueToPay", valueToPay);
      dataToSend.append("remainFactor", remainFactor);
      console.log(
        descriptionFactor,
        client,
        dateFactor,
        valueToPay,
        remainFactor,
        imageFactor
      );
      const { data,status } = await axios.put(
        pageUrl + "/factor/updateFactor/" + id,
        dataToSend,
        config
      );

      setData(data);
      dispatch(notification({errorNot:data.msg,status:status}))

      dispatch(errorHandler({ error: [] }));
      dispatch(display({ show: false, page: "" }));
      dispatch(trigger());
    } catch (error) {
      const { response } = error;
      console.log(response.status);
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
    console.log("----------------------", id);

    if (id == -1) {
      await send(e);
    } else {
      await update(id, e);
    }
  };
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>{id === -1 ? "Add Factor" : "Upadte Factor"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="mb-4">Factor description:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setDescriptionFactor(e.target.value)}
            />

            {console.log(descriptionFactor)}

            {Array.isArray(errorDescription)
              ? errorDescription
                  .filter((el) => (el.param == "descriptionFactor" ? el : ""))
                  .map((el) => (
                    <Form.Text className="m-2 text-danger">
                      <li>{el.msg}</li>
                    </Form.Text>
                  ))
              : console.warn(errorDescription)}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mb-4">Client:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setClient(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {Array.isArray(errorDescription)
                ? errorDescription
                    .filter((el) => (el.param == "client" ? el : ""))
                    .map((el) => (
                      <Form.Text className="m-2 text-danger">
                        <li>{el.msg}</li>
                      </Form.Text>
                    ))
                : ""}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mb-4">Factor image:</Form.Label>
            <Form.Control
              className="mb-1"
              type="file"
              onChange={(e) => setImageFactor(e.target.files[0])}
            />
            <Form.Text className="m-2 text-danger">
              {Array.isArray(errorDescription)
                ? errorDescription
                    .filter((el) => (el.param == "imageFactor" ? el : ""))
                    .map((el) => (
                      <Form.Text className="m-2 text-danger">
                        <li>{el.msg}</li>
                      </Form.Text>
                    ))
                : ""}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mb-4">Factor date:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setDateFactor(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {Array.isArray(errorDescription)
                ? errorDescription
                    .filter((el) => (el.param == "dateFactor" ? el : ""))
                    .map((el) => (
                      <Form.Text className="m-2 text-danger">
                        <li>{el.msg}</li>
                      </Form.Text>
                    ))
                : ""}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mb-4">Value to pay:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setValueToPay(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {Array.isArray(errorDescription)
                ? errorDescription
                    .filter((el) => (el.param == "valueToPay" ? el : ""))
                    .map((el) => (
                      <Form.Text className="m-2 text-danger">
                        <li>{el.msg}</li>
                      </Form.Text>
                    ))
                : ""}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mb-4">Factor remain:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setRemainFactor(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {Array.isArray(errorDescription)
                ? errorDescription
                    .filter((el) => (el.param == "remainFactor" ? el : ""))
                    .map((el) => (
                      <Form.Text className="m-2 text-danger">
                        <li>{el.msg}</li>
                      </Form.Text>
                    ))
                : ""}
            </Form.Text>
          </Form.Group>
        </Form>
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
      </Modal.Body>
    </div>
  );
};

export default FactorForm;
