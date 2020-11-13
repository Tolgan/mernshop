import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Spinnerr from "../components/Spinnerr";
import FormContainer from "../components/FormContainer";
import { UserContext } from "../userContext/userState";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const context = useContext(UserContext);
  const {
    loading,
    user,
    error,
    userDetails,
    updateUsers,
    userUpdateReset,
    success,
  } = context;

  useEffect(() => {
    if (success) {
      userUpdateReset();
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        userDetails(userId);
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, success]);
  const submitHandler = (e) => {
    e.preventDefault();
    updateUsers({ _id: userId, name, email, isAdmin });
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        <strong> Go Back </strong>
      </Link>
      <FormContainer>
        <h1>Edit User</h1>

        {loading ? (
          <Spinnerr />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
