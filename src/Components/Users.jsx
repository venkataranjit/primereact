import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import AddUserForm from "./AddUserForm";
import UserData from "./UserData";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const toastStyle = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Slide,
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
  const handleAddCloseModal = () => {
    setInputData(initialData);
    setShowAddModal(false);
    setIsEdit(false);
  };

  const handleAddShowModal = () => {
    setShowAddModal(true);
  };

  const handleDeleteCloseModal = () => setShowDeleteModal(false);
  const handleDeleteShowModal = (id) => {
    setShowDeleteModal(true);
    setSeletctedDeleteUser(id);
  };

  const handleReset = () => {
    setInputData(initialData);
    toast.success("Feilds Reset Done", toastStyle);
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

    if (inputData.name.length < 1 || inputData.username.length < 1) {
      toast.error("Please Fill All Feilds", toastStyle);
    } else {
      try {
        if (isEdit) {
          const response = await axios.put(
            `http://localhost:4000/users/${selectedId}`,
            userData
          );
          if (response) {
            toast.success("Users Updated Succesfully", toastStyle);
            setInputData(initialData);
            getUsersList();
          }
        } else {
          const response = await axios.post("http://localhost:4000/users", {
            ...userData,
            id: Number(Date.now()), // Adding ID only on creation
          });
          if (response) {
            toast.success("Users Updated Succesfully", toastStyle);
          }
        }
      } catch (e) {
        toast.error(e.message, toastStyle);
      } finally {
        handleAddCloseModal();
        getUsersList();
      }
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
      toast.error(e.message, toastStyle);
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
        toast.success("User Deleted Succesfully", toastStyle);
      }
    } catch (e) {
      toast.error(e.message, toastStyle);
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
                  <th
                    className="bg-primary text-white"
                    style={{ width: "20%" }}
                  >
                    User Name
                  </th>
                  <th
                    className="bg-primary text-white"
                    style={{ width: "20%" }}
                  >
                    Email
                  </th>
                  <th
                    className="bg-primary text-white"
                    style={{ width: "124px" }}
                  >
                    Actions
                  </th>
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

      <AddUserForm
        showAddModal={showAddModal}
        handleAddCloseModal={handleAddCloseModal}
        inputData={inputData}
        handleInput={handleInput}
        handleAddUser={handleAddUser}
        handleReset={handleReset}
        isEdit={isEdit}
      />

      <ToastContainer />
    </>
  );
};

export default Users;
