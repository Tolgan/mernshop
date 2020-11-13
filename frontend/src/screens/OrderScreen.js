import React, { useContext, useEffect, useState } from "react";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import { OrderContext } from "../orderContext/orderState";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Spinnerr from "../components/Spinnerr";
import { UserContext } from "../userContext/userState";
const OrderScreen = ({ match, history }) => {
  const ordercontext = useContext(OrderContext);
  const usercontext = useContext(UserContext);
  const { userInfo } = usercontext;

  const orderId = match.params.id;
  const {
    order,
    loading,
    payOrder,
    error: orderErrors,
    getOrderDetails,
    orderPayReset,
    success: orderSuccess,
    deliverOrder,
  } = ordercontext;
  if (!loading) {
    const addDecimals = (number) => {
      return (Math.round(number * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0)
    );
  }
  const [sdkReady, setSdkReady] = useState(false);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || order.length === 0 || orderSuccess || order._id !== orderId) {
      orderPayReset();
      getOrderDetails(orderId);
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [history, orderId, order, orderSuccess]);
  //CALC

  const successPayment = (paymentResult) => {
    payOrder(orderId, paymentResult);
  };

  return loading ? (
    <Spinnerr />
  ) : orderErrors ? (
    <Message variant="danger">{orderErrors}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong> Address :</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}{" "}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <div>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {order.paymentMethod}
              </div>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt} </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {loading && <Spinnerr />}{" "}
                {!sdkReady ? (
                  <Spinnerr />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPayment}
                  />
                )}
              </ListGroup.Item>
            )}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={() => deliverOrder(orderId)}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
