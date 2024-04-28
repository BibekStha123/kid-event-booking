import React, { useEffect, useRef, useState } from 'react';
import axiosClient from '../../api/axios';
import { useStateContext } from '../../ContextProvider'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated, isOrganizer } from '../../helpers';

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
                if (isAuthenticated()) {
                    if (isOrganizer()) {
                        history.push('/organizer-dashboard')
                    } else {
                        history.push('/dashboard')
                    }
                }
            })
            .catch(({ response }) => {
                toast.error(response.data.message)
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
                            <p>Not Registered? <Link to="/register">Create an account</Link>  </p>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default Login;