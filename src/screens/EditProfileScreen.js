import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, profileUserUpdate } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const EditProfileScreen = props => {

    const userId = props.match.params.id;

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {
        error: errorUpdate,
        success: successUpdate,
        loading: updateLoading
    } = userUpdateProfile;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            props.history.push('/profile')
        }
        if (!user) {
            dispatch(detailsUser(userId))
        } else {
            setName(user.name)
            setMobile(user.mobile)
            setEmail(user.email)
        }

    }, [dispatch, userId, successUpdate, user, props])

    const submitHandler = e => {
        e.preventDefault();
        dispatch(profileUserUpdate({
            _id: userId,
            name,
            mobile,
            email,
            password
        }))
    }
    return (
        <div className="container col-md-6 mt-5">
            {loading && <LoadingBox></LoadingBox>}
            {updateLoading && <LoadingBox></LoadingBox>}
            {error && <MessageBox>{error}</MessageBox>}
            {errorUpdate && <MessageBox>{errorUpdate}</MessageBox>}
            <h1 className="text-center">Edit Profile Details</h1>
            <form className="mt-5" onSubmit={submitHandler}>
                <div className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name" id="name"
                            placeholder="Name"
                            style={{ fontSize: '1.5rem' }}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input
                            type="text"
                            className="form-control"
                            name="mobile"
                            id="mobile"
                            placeholder="Mobile"
                            style={{ fontSize: '1.5rem' }}
                            value={mobile}
                            onChange={e => setMobile(e.target.value)}
                        />
                    </div>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Email"
                        style={{ fontSize: '1.5rem' }}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        style={{ fontSize: '1.5rem' }}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-warning btn-block" style={{ fontSize: '1.6rem' }}>Save Changes</button>
            </form>
        </div>

    )
}

export default EditProfileScreen
