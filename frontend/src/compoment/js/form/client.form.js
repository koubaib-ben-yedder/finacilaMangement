import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  display,
  errorHandler,
  notification,
  trigger,
} from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
const ClientForm = ({ id, handleClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");

  const dispatch = useDispatch();
  const triggerVariable = useSelector((state) => state.trigger);
  const { pageUrl, errorDescription } = useSelector((state) => state);

  const send = async (e) => {
    e.preventDefault();

    console.log("*", id);

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
          "Content-Type": "application/json",
        },
      };
      const dataToSend = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        job: job,
      };
      console.log(dataToSend);
      const { data,status } = await axios.post(
        pageUrl + "/client/addClient",
        dataToSend,
        config
      );

      dispatch(trigger());
      dispatch(notification({errorNot:data.msg,status:status}))

      dispatch(errorHandler({ error: [] }));
      dispatch(display({ show: false, page: "" }));
      console.log(triggerVariable);
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
  const update = async (e, id) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("webtoken"),
          "Content-Type": "application/json",
        },
      };

      const dataToSend = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        job: job,
      };

      const { data,status} = await axios.put(
        pageUrl + "/client/updateClient/" + id,
        dataToSend,
        config
      );
      dispatch(errorHandler({ error: [] }));
      dispatch(notification({errorNot:data.msg,status:status}))

      dispatch(trigger());
      dispatch(display({ show: false, page: "" }));
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
  const flipe = async (e, id) => {
    console.log("----------------------", e, id);
    if (id == -1) {
      await send(e);
    } else {
      console.log(e);

      await update(e, id);
    }
  };
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>{id == -1 ? "Add Client" : "Update Client"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="mb-4">First name:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {errorDescription
                .filter((el) => (el.param == "firstName" ? el : ""))
                .map((el) => (
                  <>
                    <li>{el.msg}</li>
                  </>
                ))}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mb-4">last name:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {errorDescription
                .filter((el) => (el.param == "lastName" ? el : ""))
                .map((el) => (
                  <>
                    <li>{el.msg}</li>
                  </>
                ))}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-4">age:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setAge(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {errorDescription
                .filter((el) => (el.param == "age" ? el : ""))
                .map((el) => (
                  <>
                    <li>{el.msg}</li>
                  </>
                ))}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-4">job:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setJob(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {errorDescription
                .filter((el) => (el.param == "job" ? el : ""))
                .map((el) => (
                  <>
                    <li>{el.msg}</li>
                  </>
                ))}
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant={id == -1 ? "outline-success" : "outline-primary"}
          onClick={async (e) => await flipe(e, id)}
        >
          {id == -1 ? "Save Changes" : "update"}
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default ClientForm;
