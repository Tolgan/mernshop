import React, { useContext, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Message from "../components/Message";
import Spinnerr from "../components/Spinnerr";
import { UserContext } from "../userContext/userState";
import { OrderContext } from "../orderContext/orderState";

const OrderListScreen = ({ history }) => {
  const context = useContext(OrderContext);
  const { getOrdersList, orders, error, listloading } = context;
  const userContext = useContext(UserContext);
  const { userInfo } = userContext;
  console.log(orders);
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      getOrdersList();
    } else {
      history.push("/login");
    }
  }, [history, userInfo]);

  return (
    <>
      <h1>Orders</h1>

      {listloading ? (
        <Spinnerr />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.user && item.user.name}</td>
                <td>{item.createdAt.substring(0, 10)}</td>
                <td>${item.totalPrice}</td>
                <td>
                  {item.isPaid ? (
                    item.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {item.isDelivered ? (
                    item.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${item._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
