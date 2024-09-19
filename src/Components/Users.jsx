import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";

import UserData from "./UserData";

const Users = () => {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleShow = (id) => {
    setShow(true);
    setSelectedId(id);
  };

  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    getUsersList();
  }, []);
  return (
    <>
      <Container>
        <h3>Users</h3>
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
                {users.map((eachItem) => {
                  return (
                    <tr key={eachItem.id}>
                      <td>{eachItem.name}</td>
                      <td>{eachItem.username}</td>
                      <td>{eachItem.email}</td>

                      <td style={{ textAlign: "center" }}>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleShow(eachItem.id)}
                        >
                          <i className="pi pi-eye"></i>
                        </Button>{" "}
                        <Button variant="warning" size="sm">
                          <i className="pi pi-file-edit"></i>
                        </Button>{" "}
                        <Button variant="danger" size="sm">
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
        show={show}
        setShow={setShow}
      />
    </>
  );
};

export default Users;
