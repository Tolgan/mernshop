import React from "react";
import { Spinner } from "react-bootstrap";

const Spinnerr = () => {
  return (
    <Spinner
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
      animation="border"
      role="status"
    >
      <span className="sr-only">Loading....</span>
    </Spinner>
  );
};

export default Spinnerr;
