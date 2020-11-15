import React, { useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import "antd/dist/antd.css";
import { FormattedMessage } from "react-intl";
import Spinnerr from "../components/Spinnerr";
import { ProductContext } from "../productContext/productState";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import Filtering from "../components/Filtering";
const Homescreen = ({ match, location }) => {
  const context = useContext(ProductContext);
  const {
    listProducts,
    products,
    error,
    loading,
    page,
    pages,
    maxprice,
    minprice,
  } = context;
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const minPrice = new URLSearchParams(location.search).get("min");
  const maxPrice = new URLSearchParams(location.search).get("max");
  const category = new URLSearchParams(location.search).get("category");

  const price = [minPrice, maxPrice];

  useEffect(() => {
    listProducts(keyword, pageNumber, price, category);
  }, [keyword, pageNumber, location]);
  return (
    <>
      <Meta />

      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          <FormattedMessage id="goback" />
        </Link>
      )}
      <h1>
        <FormattedMessage id="latestproducts" />
      </h1>
      <Route
        render={({ history }) => (
          <Filtering
            history={history}
            maxprice={maxprice}
            minprice={minprice}
            loading={loading}
          />
        )}
      />
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
