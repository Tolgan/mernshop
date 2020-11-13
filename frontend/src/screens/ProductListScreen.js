import React, { useContext, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Spinnerr from "../components/Spinnerr";
import { ProductContext } from "../productContext/productState";
import { UserContext } from "../userContext/userState";
import Paginate from "../components/Paginate";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const context = useContext(ProductContext);
  const {
    listProducts,
    products,
    product,
    productCreateReset,
    loading,
    error,
    deleteProduct,
    createProduct,
    success,
    successDelete,
    pages,
    page,
  } = context;
  const userContext = useContext(UserContext);
  const { userInfo } = userContext;
  useEffect(() => {
    productCreateReset();
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (success) {
      history.push(`/admin/product/${product._id}/edit`);
    } else {
      listProducts("", pageNumber);
    }
  }, [history, userInfo, pageNumber, success, successDelete]);

  const deleteHandler = (id) => {
    //EDIT CONFIRMATION SCREEN AS MODAL !! ITD LOOK BETTER
    if (window.confirm("Are you Sure ?")) {
      deleteProduct(id);
      productCreateReset();
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={() => createProduct()}>
            <i className="fas fa-plus" />
            Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Spinnerr />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${item._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {
                        deleteHandler(item._id);
                      }}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
