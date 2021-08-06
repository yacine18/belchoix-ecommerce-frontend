import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Link } from 'react-router-dom'
import MessageBox from '../components/MessageBox'

const CartScreen = props => {
    const productId = props.match.params.id
    const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const dispatch = useDispatch()
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }

    }, [dispatch, qty, productId])

    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }
    return (
        <div className="container mt-5">
            {
                cartItems.length === 0 ? (
                    <MessageBox variant="warning">
                        Cart is Empty. <Link to="/">Go to Shopping</Link>

                    </MessageBox>
                ) : (

                    <div className="row" style={{ justifyContent: 'space-between' }}>
                        <div className="col-md-6 mt-5 py-5">
                            {
                                cartItems.map(item => (
                                    <div key={item.product} className="row mt-3" style={{ justifyContent: 'space-between' }}>
                                        <Link to={`/product/${item.product}`}>
                                            <img src={`/${item.image}`} width="75" alt="iphone" />
                                        </Link>
                                        <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>
                                            <h2 className="my-auto">{item.name}</h2>
                                        </Link>
                                        <select
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(item.product, Number(e.target.value))
                                                )
                                            }
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <h2>${item.price}</h2>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger my-4 py-1"
                                            onClick={() => removeFromCartHandler(item.product)}
                                            style={{ fontSize: '1.5rem', borderRadius: '0.5rem' }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))
                            }

                        </div>

                        <div className=" col-md-4 mt-5">
                            <div className="mt-5 py-2">
                                <strong style={{ fontSize: '1.8rem' }}>
                                    Subtotal ({cartItems.length} items) :
                                    ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                                </strong>
                            </div>
                            <div className="mt-2">
                                <button
                                    type="button"
                                    className="btn btn-block btn-warning"
                                    onClick={checkoutHandler}
                                    style={{ fontSize: '1.7rem', boxShadow: 'none' }}
                                >
                                    Proceed To Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }


        </div >
    )
}

export default CartScreen
