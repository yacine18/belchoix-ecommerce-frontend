import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <div className="card mt-4 my-2 col-md-3 ml-4 mr-5">
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <img width="200" src={product.image} alt={product.name} />
                </Link>
                <Link to={`/product/${product._id}`} style={{textDecoration:'none'}}>
                    <h3 className="card-title">{product.name}</h3>
                </Link>

                <h5 className="card-subtitle mb-2 text-muted">{product.brand}</h5>
                <p className="card-text" style={{fontWeight: 'bold'}}>${product.price}</p>
                <Rating rating={product.rating} numReviews={product.numReviews} />
            </div>
        </div>
    )
}

export default Product
