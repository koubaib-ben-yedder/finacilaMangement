import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  display,
  errorHandler,
  notification,
  trigger,
} from "../../../redux/action";
import { useNavigate } from "react-router-dom";
const UserForm = ({ handleClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState("");
  const { pageUrl, errorDescription } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const update = async (e) => {
    e.preventDefault();
    console.log("-----");

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
        email: email,
        password: password,
        age: age,
      };
      console.log(dataToSend);
      const { data,status } = await axios.put(
        pageUrl + "/user/updateUser",
        dataToSend,
        config
      );
      dispatch(errorHandler({ error: [] }));
      dispatch(notification({errorNot:data.msg,status:status}))

      dispatch(display({ show: false, page: "" }));
      localStorage.removeItem("webtoken");
      setData(data);
      navigate("/login");
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
            notification({ errorNot: response.data, status: response.status })
          );
        }
      }
    }
  };
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="mb-4">Email address:</Form.Label>
            <Form.Control
              className="mb-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {Array.isArray(errorDescription)
                ? errorDescription
                    .filter((el) => (el.param == "email" ? el : ""))
                    .map((el) => (
                      <Form.Text className="m-2 text-danger">
                        <li>{el.msg}</li>
                      </Form.Text>
                    ))
                : ""}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mb-4">Password:</Form.Label>
            <Form.Control
              className="mb-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {Array.isArray(errorDescription)
                ? errorDescription
                    .filter((el) => (el.param == "password" ? el : ""))
                    .map((el) => (
                      <Form.Text className="m-2 text-danger">
                        <li>{el.msg}</li>
                      </Form.Text>
                    ))
                : ""}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mb-4">firstName:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {Array.isArray(errorDescription)
                ? errorDescription
                    .filter((el) => (el.param == "firstName" ? el : ""))
                    .map((el) => (
                      <Form.Text className="m-2 text-danger">
                        <li>{el.msg}</li>
                      </Form.Text>
                    ))
                : ""}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mb-4">lastName:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {Array.isArray(errorDescription)
                ? errorDescription
                    .filter((el) => (el.param == "lastName" ? el : ""))
                    .map((el) => (
                      <Form.Text className="m-2 text-danger">
                        <li>{el.msg}</li>
                      </Form.Text>
                    ))
                : ""}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="mb-4">age:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              onChange={(e) => setAge(e.target.value)}
            />
            <Form.Text className="m-2 text-danger">
              {Array.isArray(errorDescription)
                ? errorDescription
                    .filter((el) => (el.param == "age" ? el : ""))
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
          <Button variant="outline-primary" onClick={(e) => update(e)}>
            update
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </div>
  );
};

export default UserForm;
