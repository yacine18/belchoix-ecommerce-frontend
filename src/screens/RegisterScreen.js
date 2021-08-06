import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userAction'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'


const RegisterScreen = props => {
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, error, loading } = userRegister

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [userInfo, props, redirect])

    const dispatch = useDispatch()

    const submitHandler = e => {
        e.preventDefault()
        dispatch(register({
            name,
            mobile,
            email,
            password
        }))
    }
    return (
        <div className="container mt-5 p-5 mx-auto">
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox>{error}</MessageBox>}
            <h1 className="text-center p-5 m-5" style={{ fontWeight: 'bold' }}>Create Account</h1>
            <form className="col-md-5 mt-5 ml-5 mr-5 my-auto px-2 mx-auto" onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="name" style={{ fontSize: '1.8rem' }}>Name</label>
                    <input
                        type="text"
                        className="form-control p-2"
                        id="name"
                        placeholder="Enter Name"
                        style={{ fontSize: '1.8rem', boxShadow: 'none' }}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile" style={{ fontSize: '1.8rem' }}>Mobile</label>
                    <input
                        type="text"
                        className="form-control p-2"
                        id="mobile"
                        placeholder="Enter Mobile"
                        style={{ fontSize: '1.8rem', boxShadow: 'none' }}
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                    />
                </div>
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
                <button type="submit" className="btn btn-warning btn-block" style={{ fontSize: '1.8rem' }}>Submit</button>
            </form>
            <p className="mt-5 p-5 text-center">Already Customer? <Link to={`/signin?redirect=${redirect}`}>Sign In</Link></p>
        </div>
    )
}

export default RegisterScreen
