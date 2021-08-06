import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../actions/productAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

const ProductScreen = props => {
    const productId = props.match.params.id
    const [qty, setQty] = useState(1)

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId])

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }
    return (
        <div className="container mt-5">
            {
                loading ? (<LoadingBox></LoadingBox>)
                    :
                    error ? (<MessageBox>{error}</MessageBox>)
                        :
                        (
                            <>
                                <div className="row mt-3 ml-5 mr-5 my-auto px-2">
                                    <div className="mt-4 m-2">
                                        <img src={`/${product.image}`} width="250" alt={product.name} />
                                    </div>
                                    <div className="px-2 m-5 mt-4 p-5">
                                        <h3 className="card-title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{product.name}</h3>
                                        <h5 className="card-subtitle mb-2 text-muted">Brand: {product.brand}</h5>
                                        <p className="card-text mt-5" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>${product.price}</p>

                                        {
                                            product.countInStock > 0 ? (
                                                <>
                                                    <p className="card-text mt-5 text-success">In Stock</p>
                                                    <select
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                        className="mb-4 p-3"
                                                        style={{ borderRadius: '0.5rem', boxShadow: 'none' }}
                                                    >
                                                        {[...Array(product.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    <button
                                                        type="button"
                                                        className="btn btn-warning btn-block"
                                                        style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                                                        onClick={addToCartHandler}
                                                    >
                                                        Add To Cart
                                                    </button>
                                                </>
                                            )
                                                :
                                                (<p className="card-text mt-5 text-danger">Out of Stock</p>)
                                        }
                                    </div>
                                </div>
                                <div className=" m-5">
                                    <strong>Description</strong>
                                    <div className="card p-5 mt-3" style={{ maxWidth: "750px" }}>
                                        <p>
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )
            }

        </div >
    )
}

export default ProductScreen
