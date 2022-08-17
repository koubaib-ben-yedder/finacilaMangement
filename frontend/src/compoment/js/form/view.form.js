import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
const ViewForm = ({ oneData, handleClose, view }) => {
  const { imageUrl } = useSelector((state) => state);
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>{view == "income" ? "income" : "factor"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {view == "income" ? (
          <>
            <div className="d-flex">
              <div className="me-5">Income name:</div>
              <div>{oneData.nameIncome}</div>
            </div>
            <div className="d-flex">
              <div className="me-5">Description income:</div>
              <div> {oneData.descriptionIncome}</div>
            </div>
            <div className="d-flex">
              <div className="me-5">Income date:</div>
              <div>{oneData.dateIncome}</div>
            </div>
            <div className="d-flex">
              <div className="me-5">Many to pay:</div>
              <div>{oneData.manyToHave}</div>
            </div>
            <div className="d-flex">
              <div className="me-5">Income remain</div>
              <div>{oneData.remainIncome}</div>
            </div>
          </>
        ) : view == "Client" ? (
          <>
            <div className="d-flex">
              <div className="me-5">Client firstName:</div>
              <div>{oneData.firstName}</div>
            </div>
            <div className="d-flex">
              <div className="me-5">Client lastName :</div>
              <div> {oneData.lastName}</div>
            </div>
            <div className="d-flex">
              <div className="me-5">Client age:</div>
              <div>{oneData.age}</div>
            </div>
            <div className="d-flex">
              <div className="me-5">Client job:</div>
              <div>{oneData.job}</div>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-evenly">
              <div>
                <img
                  style={{ height: "100%s", width: "10rem" }}
                  src={imageUrl + "/" + oneData.imageFactor}
                  onClick={() =>
                    (window.location.href =
                      imageUrl + "/" + oneData.imageFactor)
                  }
                />
              </div>
              <div>
                <div>
                  <div className="me-5">Factor description:</div>
                  <div>{oneData.descriptionFactor}</div>
                </div>
                <div>
                  <div className="me-5">Client:</div>
                  <div> {oneData.client}</div>
                </div>

                <div>
                  <div>Factor Date:</div>
                  <div>{oneData.dateFactor}</div>
                </div>
                <div>
                  <div className="me-5">Value to pay:</div>
                  <div>{oneData.valueToPay}</div>
                </div>
                <div>
                  <div className="me-5">Factor remain:</div>
                  <div>{oneData.remainFactor}</div>
                </div>
              </div>
            </div>
          </>
        )}

        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </div>
  );
};

export default ViewForm;
