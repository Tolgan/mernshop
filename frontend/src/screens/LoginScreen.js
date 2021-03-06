import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Spinnerr from "../components/Spinnerr";
import FormContainer from "../components/FormContainer";
import { UserContext } from "../userContext/userState";
import { FormattedMessage } from "react-intl";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(UserContext);
  const { loading, login, error, userInfo } = context;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    userInfo && history.push(redirect);
  }, [userInfo, error]);
  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <FormContainer>
      <h1>
        {" "}
        <FormattedMessage id="login" />
      </h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Spinnerr />}
      <Form onSubmit={submitHandler}>
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
          <FormattedMessage id="password" />
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          <FormattedMessage id="login" />
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          <FormattedMessage id="newcustomer" />

          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            <FormattedMessage id="register" />
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
