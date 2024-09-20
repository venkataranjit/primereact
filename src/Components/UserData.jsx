import React from "react";
import { Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const UserData = (props) => {
  const handleClose = () => props.setShow(false);
  const selectedUser = props.users.find(
    (eachItem) => eachItem.id === props.selectedId
  );
  if (!selectedUser) {
    return null; // Or you can display a loading spinner or a placeholder
  }
  return (
    <>
      <Modal show={props.show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="userData">
            <Row>
              <Col sm={4}>
                <label>Name</label>
                <p>{selectedUser.name}</p>
              </Col>
              <Col sm={4}>
                <label>User Name</label>
                <p>{selectedUser.username}</p>
              </Col>
              <Col sm={4}>
                <label>Email</label>
                <p>{selectedUser.email}</p>
              </Col>
              <hr />
              <Col sm={4}>
                <label>Street</label>
                <p>{selectedUser.address.street}</p>
              </Col>
              <Col sm={4}>
                <label>Suite</label>
                <p>{selectedUser.address.suite}</p>
              </Col>
              <Col sm={4}>
                <label>City</label>
                <p>{selectedUser.address.city}</p>
              </Col>
              <Col sm={4}>
                <label>zipcode</label>
                <p>{selectedUser.address.zipcode}</p>
              </Col>
              <Col sm={4}>
                <label>Latitude</label>
                <p>{selectedUser.address.geo.lat}</p>
              </Col>
              <Col sm={4}>
                <label>Langitude</label>
                <p>{selectedUser.address.geo.lng}</p>
              </Col>
              <hr />
              <Col sm={4}>
                <label>Phone</label>
                <p>{selectedUser.phone}</p>
              </Col>
              <Col sm={4}>
                <label>Website</label>
                <p>{selectedUser.website}</p>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserData;
