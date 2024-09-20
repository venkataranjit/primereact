import React from "react";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";

const AddUserForm = ({
  showAddModal,
  handleAddCloseModal,
  inputData,
  handleInput,
  handleAddUser,
  handleReset,
  isEdit,
}) => {
  return (
    <div>
      <Modal show={showAddModal} onHide={handleAddCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit ? "Edit User Details" : "Add New Users"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={inputData.name}
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter User Name"
                    name="username"
                    value={inputData.username}
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email ID</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email ID"
                    name="email"
                    value={inputData.email}
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>
              </Col>
              <hr />
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="street">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Street"
                    name="street"
                    value={inputData.street}
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="suite">
                  <Form.Label>Suite</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Suite"
                    name="suite"
                    value={inputData.suite}
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter City"
                    name="city"
                    value={inputData.city}
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="zipCode">
                  <Form.Label>Zipcode</Form.Label>
                  <Form.Select
                    aria-label="zipcode"
                    name="zipcode"
                    value={inputData.zipcode}
                    onChange={(e) => handleInput(e)}
                  >
                    <option>Select ZipCode</option>
                    <option value="500001">500001</option>
                    <option value="500002">500002</option>
                    <option value="500003">500003</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="latitude">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Latitude"
                    name="lat"
                    value={inputData.lat}
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="langitude">
                  <Form.Label>Langitude</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Langitude"
                    name="lng"
                    value={inputData.lng}
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>
              </Col>
              <hr />
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone Number"
                    name="phone"
                    value={inputData.phone}
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="website">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Website"
                    name="website"
                    value={inputData.website}
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="danger" onClick={handleAddCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={(e) => handleAddUser(e)}>
            {isEdit ? "Edit User" : "Add New User"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddUserForm;
