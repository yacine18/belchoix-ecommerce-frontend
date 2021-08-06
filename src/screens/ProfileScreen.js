import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser } from '../actions/userAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { Link } from 'react-router-dom'
import { USER_DETAILS_RESET } from '../constants/userConstants'

const ProfileScreen = () => {

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            dispatch({type: USER_DETAILS_RESET})
            dispatch(detailsUser(userInfo._id))
        }

    }, [dispatch, userInfo, user])
    return (
        <div className="container mt-5">
            <div className="row">
                {
                    loading ? <LoadingBox></LoadingBox>
                        :
                        error ? <MessageBox>{error}</MessageBox>
                            :
                            (
                                <div className="col-md-3 mt-5 m-5 mx-auto">
                                    <div className="row-md-6">
                                        <h1>Account Details</h1>
                                        <Link to={`/profile/${user._id}/edit`} style={{textDecoration:'none'}}>
                                            <button type="button" className="btn btn-block btn-warning" style={{ fontSize: '1.7rem' }}>Edit</button>
                                        </Link>
                                    </div>

                                    <div className="mt-5 m-5 mx-auto p-2">
                                        <div>
                                            <strong>Name</strong>  <h2>{user.name}</h2>
                                        </div>
                                        <div>
                                            <strong>Email</strong> <h3>{user.email}</h3>
                                        </div>
                                        <div>
                                            <strong>Mobile</strong> <h3>{user.mobile}</h3>
                                        </div>

                                    </div>
                                </div>
                            )
                }

            </div>
        </div>
    )
}

export default ProfileScreen
