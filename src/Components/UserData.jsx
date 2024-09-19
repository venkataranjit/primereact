import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

const UserData = (props) => {
  const selectedUser = props.users.find(
    (eachItem) => eachItem.id === props.selectedId
  );
  return (
    <>
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
            <label>Phone</label>
            <p>{selectedUser.phone}</p>
          </Col>
          <Col sm={4}>
            <label>Website</label>
            <p>{selectedUser.website}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserData;
