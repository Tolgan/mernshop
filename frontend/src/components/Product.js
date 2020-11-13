import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating.js";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded cardstyling">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          className="dropshadow"
          src={product.image}
          variant="top"
          style={{ height: "25vh" }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <Rating
              rating={product.rating}
              text={`${product.numReviews} reviews `}
            />
          </Card.Text>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
