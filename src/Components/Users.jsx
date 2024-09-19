import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";

import UserData from "./UserData";

const Users = () => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  const handleShowUserModal = (id) => {
    setShowUserModal(true);
    setSelectedId(id);
  };

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setSelectedId(id);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
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
      if (response.status === 200) {
        const deletedUser = users.filter((eachItem) => eachItem.id !== id);
        setUsers(deletedUser); //setUsers((prevusers)=>prevusers.filter((eachUser)=>eachUser.id !== id))
        handleCloseDeleteModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const filteredUsers = users.filter(
    (eachItem) =>
      eachItem.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      eachItem.address.suite.toLowerCase().includes(searchUser.toLowerCase())
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
            <Button variant="success" size="sm" className="mb-2">
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
                        <Button variant="warning" size="sm">
                          <i className="pi pi-file-edit"></i>
                        </Button>{" "}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleShowDeleteModal(eachItem.id)}
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

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(selectedId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Users;
