import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentMethodScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    props.history.push("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className="container col-md-6" onSubmit={submitHandler}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="flexRadioDefault1"
            value="PayPal"
            name="paymentMethod"
            onClick={(e) => setPaymentMethod(e.target.value)}
            checked
            required
          />
          <label className="form-check-label ml-2" htmlFor="flexRadioDefault1">
            PayPal
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="flexRadioDefault1"
            value="Cash on Delivery"
            name="paymentMethod"
            onClick={(e) => setPaymentMethod(e.target.value)}
            required
          />
          <label className="form-check-label ml-2" htmlFor="flexRadioDefault1">
            Cash On Delivery
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-warning btn-block"
          style={{ fontSize: "1.8rem" }}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentMethodScreen;
