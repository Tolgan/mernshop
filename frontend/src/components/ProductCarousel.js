import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message";
import { ProductContext } from "../productContext/productState";
import Spinnerr from "./Spinnerr";
const ProductCarousel = () => {
  const context = useContext(ProductContext);
  const { topProducts, listTopProducts, loadingtop, error } = context;
  console.log(topProducts);
  useEffect(() => {
    listTopProducts();
  }, []);
  return loadingtop ? (
    <Spinnerr />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
