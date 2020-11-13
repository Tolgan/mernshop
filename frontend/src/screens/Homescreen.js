import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Spinnerr from "../components/Spinnerr";
import { ProductContext } from "../productContext/productState";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
const Homescreen = ({ match }) => {
  const context = useContext(ProductContext);
  const { listProducts, products, error, loading, page, pages } = context;
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    listProducts(keyword, pageNumber);
  }, [keyword, pageNumber]);
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Spinnerr />
      ) : error ? (
        <Message variant="danger">{error} </Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
      <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""} />
    </>
  );
};

export default Homescreen;
