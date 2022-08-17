import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const InfoForm = ({infoType,handleClose}) => {
  return (
  <>
      <Modal.Header closeButton>
        <Modal.Title> Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            
   
        {infoType}

      
      </Modal.Body>
                

      <Modal.Footer>
        <Button  variant="outline-danger" onClick={handleClose}>
          Close
        </Button>
      
      </Modal.Footer>
    </>
  )
}

export default InfoForm