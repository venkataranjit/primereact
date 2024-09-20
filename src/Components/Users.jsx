import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";

import UserData from "./UserData";

const initialData = {
  name: "",
  username: "",
  email: "",
  street: "",
  suite: "",
  city: "",
  zipcode: "",
  lat: "",
  lng: "",
  phone: "",
  website: "",
};

const Users = () => {
  const [inputData, setInputData] = useState(initialData);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [selectedDeleteUser, setSeletctedDeleteUser] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleShowUserModal = (id) => {
    setShowUserModal(true);
    setSelectedId(id);
  };
  const handleAddCloseModal = () => setShowAddModal(false);
  const handleAddShowModal = () => setShowAddModal(true);

  const handleDeleteCloseModal = () => setShowDeleteModal(false);
  const handleDeleteShowModal = (id) => {
    setShowDeleteModal(true);
    setSeletctedDeleteUser(id);
  };

  const handleReset = () => {
    setInputData(initialData);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const userData = {
      name: inputData.name,
      username: inputData.username,
      email: inputData.email,
      address: {
        street: inputData.street,
        suite: inputData.suite,
        city: inputData.city,
        zipcode: inputData.zipcode,
        geo: {
          lat: inputData.lat,
          lng: inputData.lng,
        },
      },
      phone: inputData.phone,
      website: inputData.website,
    };

    try {
      if (isEdit) {
        const response = await axios.put(
          `http://localhost:4000/users/${selectedId}`,
          userData
        );
        if (response) {
          setInputData(initialData);
          getUsersList();
        }
      } else {
        const response = await axios.post("http://localhost:4000/users", {
          ...userData,
          id: Number(Date.now()), // Adding ID only on creation
        });
        if (response) {
          setInputData(initialData);
          getUsersList();
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      handleAddCloseModal();
    }
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((eachItem) => eachItem.id === id);

    if (userToEdit) {
      setInputData({
        name: userToEdit.name,
        username: userToEdit.username,
        email: userToEdit.email,
        street: userToEdit.address.street,
        suite: userToEdit.address.suite,
        city: userToEdit.address.city,
        zipcode: userToEdit.address.zipcode,

        lat: userToEdit.address.geo.lat,
        lng: userToEdit.address.geo.lng,

        phone: userToEdit.phone,
        website: userToEdit.website,
      });
    }
    handleAddShowModal();
    setSelectedId(id);
    setIsEdit(true);
  };

  const getUsersList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      if (response) {
        setUsers(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/users/${id}`);
      if (response) {
        setUsers((prevUsers) =>
          prevUsers.filter((eachItem) => eachItem.id !== id)
        );
        setShowDeleteModal(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const filteredUsers = users.filter((eachItem) =>
    eachItem.name.toLowerCase().includes(searchUser.toLowerCase())
  );

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <>
      <Container>
        <h3>Users</h3>
        <Row>
          <Col>
            <Button
              variant="success"
              size="sm"
              className="mb-2"
              onClick={handleAddShowModal}
            >
              <i className="pi pi-plus"></i> Add New User
            </Button>
          </Col>
          <Col sm={3} className="text-right mb-2 float-end">
            <Form.Control
              type="text"
              id="search"
              name="search"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th className="bg-primary text-white">Name</th>
                  <th className="bg-primary text-white">User Name</th>
                  <th className="bg-primary text-white">Email</th>
                  <th className="bg-primary text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((eachItem) => {
                  return (
                    <tr key={eachItem.id}>
                      <td>{eachItem.name}</td>
                      <td>{eachItem.username}</td>
                      <td>{eachItem.email}</td>

                      <td style={{ textAlign: "center" }}>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleShowUserModal(eachItem.id)}
                        >
                          <i className="pi pi-eye"></i>
                        </Button>{" "}
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(eachItem.id)}
                        >
                          <i className="pi pi-file-edit"></i>
                        </Button>{" "}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteShowModal(eachItem.id)}
                        >
                          <i className="pi pi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <UserData
        users={users}
        selectedId={selectedId}
        show={showUserModal}
        setShow={setShowUserModal}
      />

      <Modal show={showDeleteModal} onHide={handleDeleteCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure You Want to Delete the User?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleDelete(selectedDeleteUser)}
          >
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={handleAddCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Users</Modal.Title>
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
                  {inputData.name}
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
                  {inputData.username}
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
                  {inputData.email}
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
                  {inputData.street}
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
                  {inputData.suite}
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
                  {inputData.city}
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
                  {inputData.zipcode}
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
                  {inputData.lat}
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
                  {inputData.lng}
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
                  {inputData.phone}
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
                  {inputData.website}
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
            Add New User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Users;
