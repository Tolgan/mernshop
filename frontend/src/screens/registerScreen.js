import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Spinnerr from "../components/Spinnerr";
import FormContainer from "../components/FormContainer";
import { UserContext } from "../userContext/userState";
import { FormattedMessage } from "react-intl";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const context = useContext(UserContext);
  const { loading, register, error, userInfo } = context;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    userInfo && history.push(redirect);
  }, [userInfo, error]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      register(name, email, password);
    }
  };

  return (
    <FormContainer>
      <h1>
        <FormattedMessage id="signup" />
      </h1>
      {message && <Message variant="danger">{message}</Message>}

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Spinnerr />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>
            <FormattedMessage id="name" />{" "}
          </Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>
            <FormattedMessage id="email" />
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>
            <FormattedMessage id="password" />
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>
            <FormattedMessage id="confirm" />
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          <FormattedMessage id="register" />
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          <FormattedMessage id="account" />
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            <FormattedMessage id="login" />
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
