import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProduct } from "../actions/productAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const SearchScreen = () => {
  const { name = "all" } = useParams();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      listProduct({
        name: name !== "all" ? name : "",
      })
    );
  }, [dispatch, name]);

  return (
    <div className="container mt-5 mx-auto">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row mt-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="card mt-4 my-2 col-md-3 mx-auto mt-5"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    width="200"
                    src={`/${product.image}`}
                    alt={product.name}
                  />
                </Link>
                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h3 className="card-title">{product.name}</h3>
                </Link>

                <h5 className="card-subtitle mb-2 text-muted">
                  {product.brand}
                </h5>
                <p className="card-text" style={{ fontWeight: "bold" }}>
                  ${product.price}
                </p>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchScreen;
