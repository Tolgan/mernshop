import React, { useEffect, useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { Image } from "antd";
import Rating from "../components/Rating";
import { ProductContext } from "../productContext/productState";
import Spinnerr from "../components/Spinnerr";
import Message from "../components/Message";
import { UserContext } from "../userContext/userState";
import Meta from "../components/Meta";
const Productscreen = ({ match, history }) => {
  const context = useContext(ProductContext);
  const usercontext = useContext(UserContext);
  const { userInfo } = usercontext;
  const {
    listProductDetails,
    createReview,
    deleteReview,
    loading,
    error,
    product,
    success,
    successDelete,
  } = context;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    listProductDetails(match.params.id);
  }, [success, successDelete]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`);
  };
  const ratingHandler = (e) => {
    setRating(e);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    createReview(match.params.id, { rating, comment });
  };
  return (
    <>
      {/* i need to use <  as a button change back  */}
      <Link className="btn btn-light my-3" to="/">
        <FormattedMessage id="back" />
      </Link>
      {loading ? (
        <Spinnerr />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />

          <Row>
            <Col md={6}>
              <Image
                src={product.image}
                alt={product.name}
                style={{ cursor: "pointer" }}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    text={`${product.numReviews} reviews`}
                    edit={true}
                    handleRating={ratingHandler}
                    userInfo={userInfo}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  <FormattedMessage id="description" />: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        {" "}
                        <FormattedMessage id="price" />:
                      </Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        {" "}
                        <FormattedMessage id="status" />:
                      </Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <FormattedMessage id="instock" />
                        ) : (
                          <FormattedMessage id="outofstock" />
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <FormattedMessage id="qty" />
                        </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => {
                                return (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                );
                              }
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      <FormattedMessage id="addtocart" />
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>
                <FormattedMessage id="reviews" />
              </h2>
              {!product.reviews ||
                (product.reviews.length === 0 && (
                  <Message>
                    <FormattedMessage id="noreviews" />
                  </Message>
                ))}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Row>
                      <Col>
                        <Rating rating={review.rating}></Rating>
                        <p>{review.createdAt.substring(0, 10)}</p>
                      </Col>
                      <Col>
                        {userInfo && review.user === userInfo._id && (
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => {
                              deleteReview(match.params.id, review._id);
                            }}
                          >
                            <i className="fas fa-trash" />
                          </Button>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <p>{review.comment}</p>
                    </Row>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>
                    <FormattedMessage id="writeacustomerreview" />
                  </h2>
                  {success && (
                    <Message variant="success">
                      <FormattedMessage id="reviewsubmittedsuccessfully" />
                    </Message>
                  )}
                  {loading && <Spinnerr />}
                  {error && <Message variant="danger">{error}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>
                          <FormattedMessage id="rating" />
                        </Form.Label>
                        <Form.Control
                          id="toselect"
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <FormattedMessage id="select">
                            {(message) => <option value="">{message}</option>}
                          </FormattedMessage>
                          <FormattedMessage id="poor">
                            {(message) => (
                              <option value="1"> 1 - {message}</option>
                            )}
                          </FormattedMessage>

                          <FormattedMessage id="fair">
                            {(message) => (
                              <option value="2"> 2 - {message}</option>
                            )}
                          </FormattedMessage>

                          <FormattedMessage id="good">
                            {(message) => (
                              <option value="3"> 3 - {message}</option>
                            )}
                          </FormattedMessage>

                          <FormattedMessage id="verygood">
                            {(message) => (
                              <option value="4"> 4 - {message}</option>
                            )}
                          </FormattedMessage>

                          <FormattedMessage id="excellent">
                            {(message) => (
                              <option value="5"> 5 - {message}</option>
                            )}
                          </FormattedMessage>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>
                          <FormattedMessage id="comment" />
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loading}
                        type="submit"
                        variant="primary"
                      >
                        <FormattedMessage id="submit" />
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Productscreen;
