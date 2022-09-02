import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const Edit = ({ handleClose }) => {
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Add Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Edit Name:</Form.Label>
            <Form.Control type="email" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="outline-success" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default Edit;
