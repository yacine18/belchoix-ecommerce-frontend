import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const PlaceOrderScreen = (props) => {

  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  const orderCreate = useSelector(state => state.orderCreate)
  const {error, loading, success, order} = orderCreate
  const toPrice = (num) => Number(num.toFixed(2));

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if(success){
      props.history.push(`/order/${order._id}`)
      dispatch({type: ORDER_CREATE_RESET})
    }
  }, [dispatch, order, props, success])

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="row container mt-5 mb-5 mx-auto">
        <div className="container col-md-6">
          <div className="card mt-5">
            <div className="card-body" style={{ fontWeight: "bold" }}>
              Shipping Address
            </div>
            <div className="card-body">
              <strong>Address: </strong> {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
              {cart.shippingAddress.country}
            </div>
          </div>
          <div className="card mt-5">
            <div className="card-body" style={{ fontWeight: "bold" }}>
              Payment
            </div>
            <div className="card-body">
              <strong>Method :</strong> {cart.paymentMethod}
            </div>
          </div>
          <div className="card mt-5">
            <div className="card-body" style={{ fontWeight: "bold" }}>
              Order Items
            </div>
            <div className="card-body">
              <ul className="text-decoration-none">
                {cart.cartItems.map((item) => (
                  <li className="row mx-auto" key={item.product}>
                    <div>
                      <img
                        className="mr-auto mx-auto mt-3"
                        src={item.image}
                        alt={item.name}
                        width="35"
                      />
                    </div>
                    <div className="mx-auto">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className="ml-auto mx-auto">
                      {item.qty} x {item.price} = ${item.qty * item.price}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="card col-md-3 mt-5">
          <div
            className="card-body text-center mt-3"
            style={{ fontWeight: "bold" }}
          >
            Order Summary
          </div>
          <div className=" card-body">
            <div className="row">
              <div>Items</div>
              <div className="ml-auto">${cart.itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div>Shipping</div>
              <div className="ml-auto">${cart.shippingPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div>Tax</div>
              <div className="ml-auto">${cart.taxPrice.toFixed(2)}</div>
            </div>
            <div className="row mt-3">
              <div>
                <strong>Order Total</strong>
              </div>
              <div className="ml-auto">
                <strong>${cart.totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          <div className="card-body"></div>
          <button
            className="mb-5 btn btn-warning btn-block"
            onClick={placeOrderHandler}
            style={{ fontSize: "1.7rem" }}
          >
            Place Order
          </button>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox>{error}</MessageBox>}
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
