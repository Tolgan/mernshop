import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./bootstrap.min.css";
import ProductState from "./productContext/productState";
import CartState from "./cartContext/cartState";
import UserState from "./userContext/userState";
import OrderState from "./orderContext/orderState";

ReactDOM.render(
  <UserState>
    <ProductState>
      <CartState>
        <OrderState>
          <App />
        </OrderState>
      </CartState>
    </ProductState>
  </UserState>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
