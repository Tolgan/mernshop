import React from "react";
import { FormattedMessage } from "react-intl";

const Sorting = ({ sort, sortPrice, sortRating }) => {
  return (
    <div
      style={{
        borderBottom: "2px solid black",
        padding: "0px",
        marginTop: "5px",
      }}
    >
      <span
        style={{
          cursor: "pointer",
          borderRight: "1px solid black",
          margin: "0 5px",
          height: "100%",
          paddingRight: "30px",
          fontSize: "1.5rem",
        }}
        onClick={() => {
          sortPrice();
        }}
      >
        <FormattedMessage id="price" />
        {sort === "price_asc" ? (
          <i className="fas fa-arrow-up" />
        ) : sort === "price_desc" ? (
          <i className="fas fa-arrow-down" />
        ) : null}
      </span>
      <span
        style={{
          cursor: "pointer",

          margin: "0 5px",
          height: "100%",
          paddingRight: "30px",
          fontSize: "1.5rem",
        }}
        onClick={() => {
          sortRating();
        }}
      >
        <FormattedMessage id="rating" />
        {sort === "rating_asc" ? (
          <i className="fas fa-arrow-up" />
        ) : sort === "rating_desc" ? (
          <i className="fas fa-arrow-down" />
        ) : null}
      </span>
    </div>
  );
};

export default Sorting;
