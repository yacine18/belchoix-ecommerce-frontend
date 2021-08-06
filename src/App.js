import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, BrowserRouter, Route } from 'react-router-dom'
import { signout } from './actions/userAction'
import PrivateRoute from './components/PrivateRoute'
import CartScreen from './screens/CartScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import HomeScreen from './screens/HomeScreen'
import OrderScreen from './screens/OrderScreen'
import OrdersList from './screens/OrdersListScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import ProductScreen from './screens/ProductScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import SigninScreen from './SigninScreen'
import SearchBox from './components/SearchBox'
import SearchScreen from './screens/SearchScreen'

const App = () => {

  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  const dispatch = useDispatch()

  const signoutHandler = () => {
    dispatch(signout())
  }
  return (
    <BrowserRouter>
      <div className=" container-fluid mt-4">
        <header>
          <div>
            <nav className="navbar navbar-light">
              <div>
                <Link to="/">
                  <img src="../images/logo.png" width="140" height="45" alt="belchoix" />
                </Link>
              </div>
              <div>
                <Route render={({history}) => (
                  <SearchBox history={history}></SearchBox>
                )} />
              </div>
              <div className="row">
                <Link to="/cart" className="mr-5">
                  <img src="../icons/shopping-cart.png" width="22" height="22" alt="cart" />
                  {
                    cartItems.length > 0  && 
                      <span className="badge text-decoration-none text-warning" style={{ fontSize: '1.6rem' }}>{cartItems.length}</span>
                    
                  }
                  
                </Link>
                {
                  userInfo ? (
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle bg-white text-dark"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={{ boxShadow: 'none', fontSize: '1.8rem', borderColor: 'white' }}
                      >
                        {userInfo.name}
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link to="/profile" className="dropdown-item" style={{ fontSize: '1.7rem' }}>Profile</Link>

                        <Link className="dropdown-item" to="/orders-history" style={{ fontSize: '1.7rem' }}>Orders</Link>
                        <Link className="dropdown-item" onClick={signoutHandler} to="#" style={{ fontSize: '1.7rem' }}>Sign out</Link>
                      </div>
                    </div>
                  ) : (
                    <Link to="/signin" className="mr-3">
                      <img src="../icons/user.png" width="22" height="22" alt="cart" />
                    </Link>
                  )
                }

              </div>
            </nav>
          </div>
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/orders-history" component={OrdersList} />
          <Route path='/search/name/:name?' component={SearchScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} exact/>
          <PrivateRoute path="/profile/:id/edit" component={EditProfileScreen} />
        </main>
        <footer className="text-center">
          <div className="text-center p-4">
            © 2021 Copyright:
            <Link to="/">
              <strong>Belchoix</strong>
            </Link>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App;
