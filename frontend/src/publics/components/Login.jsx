import React, { useEffect, useRef, useState } from 'react';
import axiosClient from '../../api/axios';
import { useStateContext } from '../../ContextProvider'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated, isOrganizer } from '../../helpers';
import GoogleIcon from '@mui/icons-material/Google';

function Login(props) {

    const emailRef = useRef();
    const passwordRef = useRef();

    const { setToken, setUsers } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/dashboard')
        }
    })

    const loginHandler = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setToken(data.access_token)
                setUsers(data.user)
                toast.success("Successfully loggedin")
                if (isAuthenticated()) {
                    if (isOrganizer()) {
                        // navigate('/organizer-dashboard')
                        window.location.href = '/organizer-dashboard'
                    } else {
                        // navigate('/dashboard')
                        window.location.href = '/dashboard'
                    }
                }
            })
            .catch(({ response }) => {
                toast.error(response.data.message)
            })

    }

    const handleGoogleLogin = () => {
        axiosClient.get('/google/redirect')
        .then(({data}) => {
            toast.success("Redirecting to Google Login")
            window.location.href = data.url
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        < div className="container p-5" >
            <div className="card">
                <h2 className="text-center my-4">Login</h2>
                <div className="card-body p-4 py-0">
                    <form onSubmit={loginHandler}>
                        <div className="form-group mb-3">
                            <label>Email address</label>
                            <input ref={emailRef} type="email" className="form-control" placeholder="Enter email" required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input ref={passwordRef} type="password" className="form-control" placeholder="Password" required />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">Login</button>
                        <div>
                            <p>Not Registered? <Link to="/register">Create an account</Link></p>
                        </div>
                    </form>
                    <button className='btn btn-outline-success mb-3' onClick={handleGoogleLogin}>
                        <GoogleIcon /> &nbsp;
                        Sign Up with Google Account
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Login;