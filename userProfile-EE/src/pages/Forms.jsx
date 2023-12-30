/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Form,  Col, Row } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice";

const Forms = ({ show, handleClose }) => {
  const { singleUser } = useSelector(({ users }) => users);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({
      name: singleUser?.name,
      email: singleUser?.email,
      phone: singleUser?.phone,
      website: singleUser?.website,
    });
  }, [singleUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(singleUser);
  const handleSaveChanges = () => {
    console.log({ id: singleUser.id, ...formData });

    if (singleUser) {
      dispatch(updateUser({ id: singleUser.id, ...formData }));
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Basic Modal </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalName">
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="name"
                  defaultValue={formData.name}
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text"
                  autoComplete="off"
                />
              </Col>
            </Form.Group>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  autoComplete="off"
                />
              </Col>
            </Form.Group>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPhone">
              <Form.Label column sm={2}>
                Phone
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel"
                  autoComplete="off"
                />
              </Col>
            </Form.Group>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalWebsite">
              <Form.Label column sm={2}>
                Website
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  type="text"
                  autoComplete="off"
                />
              </Col>
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Forms;
