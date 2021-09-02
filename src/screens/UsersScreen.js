import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersDetails } from "../actions/userAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const UsersScreen = ({ history }) => {
  const detailsUsers = useSelector((state) => state.detailsUsers);
  const { loading, error, users } = detailsUsers;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (!userInfo.isAdmin) {
    history.push("/");
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersDetails());
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
                <th scope="col">User #</th>
                <th scope="col">Date</th>
                <th scope="col">Admin</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <th scope="row">{user._id}</th>
                  <td>{user.createdAt.substring(0, 10)}</td>
                  <td>{user.isAdmin ? <span className="badge rounded-pill text-white bg-success">Admin</span> : <span className="badge rounded-pill text-white bg-secondary">User</span>}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      style={{ fontSize: "1.4rem" }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ fontSize: "1.4rem", marginLeft: "1rem" }}
                    >
                      Delete
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

export default UsersScreen;
