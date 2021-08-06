import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const OrdersListScreen = props => {

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;

  const userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin
  if(!userInfo) {
    props.history.push('/signin')
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <strong>Orders History</strong>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <>
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">Order #</th>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
                <th scope="col">Paid</th>
                <th scope="col">Delivered</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <th scope="row">{order._id}</th>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? <span className="badge badge-success">{order.paidAt.substring(0, 10)}</span> : <span className="badge badge-danger">Not Paid</span>}</td>
                  <td>{order.isDelivered ? <span className="badge badge-success">{order.deliveredAt.substring(0, 10)}</span>: <span className="badge badge-danger">Not Delivered</span>}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      style={{ fontSize: "1.4rem" }}
                      onClick={() => props.history.push(`/order/${order._id}`)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default OrdersListScreen;
