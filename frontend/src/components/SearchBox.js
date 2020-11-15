import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitSearch} inline>
      <FormattedMessage id="searchplace">
        {(placeholder) => (
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={placeholder}
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>
        )}
      </FormattedMessage>
      <Button type="submit" variant="outline-success" className="p-2">
        <FormattedMessage id="search" />
      </Button>
    </Form>
  );
};

export default SearchBox;
