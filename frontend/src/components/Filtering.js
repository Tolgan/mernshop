import React, { useState } from "react";
import { Slider, Checkbox, Row, Col, Collapse } from "antd";
import { categorys } from "../categorys";
import { Form, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
const { Panel } = Collapse;

const Filtering = ({ history, maxprice, minprice, loading }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState([]);
  const handleChange = (value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const checkboxChange = (e) => {
    setCategory(e.join(","));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    (minPrice || maxPrice) && !category.length
      ? history.push(`/?min=${minPrice}&max=${maxPrice}`)
      : minPrice || maxPrice
      ? history.push(`/?min=${minPrice}&max=${maxPrice}&category=${category}`)
      : history.push(`/?category=${category}`);
  };

  const cate = categorys.map((c) => {
    if (c.hasOwnProperty("name")) {
      c.value = c.name;
      c.label = c.name;
      delete c.name;
      delete c.id;
    }
    return c;
  });

  return (
    <Collapse>
      <Panel header={<FormattedMessage id="advancedsearch" />}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Checkbox.Group
              options={cate}
              style={{ width: "100%" }}
              onChange={checkboxChange}
            >
              <Row>
                {cate.map((item) => (
                  <Col key={item.label}>{item.value}</Col>
                ))}
              </Row>
            </Checkbox.Group>
            {!loading && (
              <>
                <div
                  style={{ width: "50%", margin: "0 auto" }}
                  className="px-4"
                  style={{ position: "relative" }}
                >
                  <h3 className="icon">{minprice}</h3>
                  <Slider
                    range
                    min={minprice}
                    max={maxprice}
                    defaultValue={[minprice, maxprice]}
                    onAfterChange={handleChange}
                  />
                  <h3 style={{ right: "2rem" }} className="icon">
                    {maxprice}
                  </h3>
                </div>

                <Button variant="primary" type="submit" className="mt-3">
                  <FormattedMessage id="search" />
                </Button>
              </>
            )}
          </Form.Group>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default Filtering;
