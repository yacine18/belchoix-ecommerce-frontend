import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listProduct } from '../actions/productAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Product from '../components/Product'

const HomeScreen = () => {

    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProduct({}))
    }, [dispatch])
    return (
        <div className="container mt-5">
            {loading ? (<LoadingBox></LoadingBox>)
                :
                error ? (<MessageBox>{error}</MessageBox>)
                    :
            
                  (  <div className="row mt-3 ml-5 mr-5 my-auto px-2">
                        {products.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>)
            }

        </div >
    )
}

export default HomeScreen
