import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signin } from './actions/userAction'
import LoadingBox from './components/LoadingBox'
import MessageBox from './components/MessageBox'

const SigninScreen = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo, loading, error } = userSignin

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect)
        }
    })

    const dispatch = useDispatch()

    const submitHandler = e => {
        e.preventDefault()
        dispatch(signin(email, password))
    }
    return (
        <div className="container mt-5 p-5 mx-auto">
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox>{error}</MessageBox>}
            <h1 className="text-center p-5 m-5" style={{ fontWeight: 'bold' }}>Sign In</h1>
            <form className="col-md-5 mt-5 ml-5 mr-5 my-auto px-2 mx-auto" onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="email" style={{ fontSize: '1.8rem' }}>Email</label>
                    <input
                        type="email"
                        className="form-control p-2"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        style={{ fontSize: '1.8rem', boxShadow: 'none' }}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" style={{ fontSize: '1.8rem' }}>Password</label>
                    <input
                        type="password"
                        className="form-control p-2"
                        id="password"
                        placeholder="Password"
                        style={{ fontSize: '1.8rem', boxShadow: 'none' }}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-warning btn-block" style={{ fontSize: '1.8rem' }}>Login</button>
            </form>
            <p className="mt-5 p-5 text-center">Haven't an Account? <Link to={`/register?redirect=${redirect}`}>Sign Up</Link></p>
        </div>
    )
}

export default SigninScreen
