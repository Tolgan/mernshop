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
import Sorting from "../components/Sorting";
const Homescreen = ({ match, location, history }) => {
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
  console.log(pageNumber);
  const minPrice = new URLSearchParams(location.search).get("min");
  const maxPrice = new URLSearchParams(location.search).get("max");
  const category = new URLSearchParams(location.search).get("category");
  const sort = new URLSearchParams(location.search).get("sort");
  const price = [minPrice, maxPrice];

  useEffect(() => {
    listProducts(keyword, pageNumber, price, category, sort);
  }, [keyword, pageNumber, location, sort]);

  function sortPrice() {
    if (!sort || (sort && sort.slice(0, 5) !== "price")) {
      history.push("/?sort=price_desc");
    } else if (sort === "price_asc") {
      history.push("/?sort=price_desc");
    } else if (sort === "price_desc") {
      history.push("/?sort=price_asc");
    }
  }

  function sortRating() {
    if (!sort || (sort && sort.slice(0, 6) !== "rating")) {
      history.push("/?sort=rating_desc");
    } else if (sort === "rating_asc") {
      history.push("/?sort=rating_desc");
    } else if (sort === "rating_desc") {
      history.push("/?sort=rating_asc");
    }
  }

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
      <Sorting sort={sort} sortRating={sortRating} sortPrice={sortPrice} />
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
      <Paginate
        page={page}
        pages={pages}
        keyword={keyword ? keyword : ""}
        sort={sort ? sort : ""}
        category={category ? category : ""}
      />
    </>
  );
};

export default Homescreen;
