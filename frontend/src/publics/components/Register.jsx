import React, { useRef, useState } from 'react';
import axiosClient from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Register() {

    const [errors, setErrors] = useState();
    const navigate = useNavigate();

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmatiomRef = useRef();
    const addressRef = useRef();
    const contactRef = useRef();
    const organizerRef = useRef();
    const parentRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmatiomRef.current.value,
            address: addressRef.current.value,
            contact_no: contactRef.current.value,
            user_type: organizerRef.current.checked ? organizerRef.current.value : parentRef.current.value
        }

        axiosClient.post('/register', payload)
            .then(({ data }) => {
                toast.success(data.message)
                navigate('/login')
            }).catch(({ response }) => {
                setErrors(response.data.errors)
                toast.error("Please check the information provided")
            })
    }


    return (
        <div>
            <div className="container p-5">
                <div className="card">
                    <h2 className="text-center my-4">Register</h2>
                    <div className="card-body p-4 py-0">
                        <ToastContainer position="top-center" />
                        {errors && <div>
                            {Object.keys(errors).map(key => (
                                <p className='text-danger text-center' key={key}>{errors[key][0]}</p>
                            ))}
                        </div>}
                        <form onSubmit={onSubmit}>
                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input ref={nameRef} type="text" className="form-control" placeholder="Enter Name" required />
                            </div>
                            <div className="form-group mb-3">
                                <label>Email address</label>
                                <input ref={emailRef} type="email" className="form-control" placeholder="Enter email" required />
                            </div>
                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input ref={passwordRef} type="password" className="form-control" placeholder="Password" required />
                            </div>
                            <div className="form-group mb-3">
                                <label>Confirm Password</label>
                                <input ref={passwordConfirmatiomRef} type="password" className="form-control" placeholder="Password Confirmation" required />
                            </div>
                            <div className="form-group mb-3">
                                <label>Address</label>
                                <input ref={addressRef} type="text" className="form-control" placeholder="Address" required />
                            </div>
                            <div className="form-group mb-3">
                                <label>Contact Number</label>
                                <input ref={contactRef} type="text" className="form-control" placeholder="Contact Number" required />
                            </div>
                            <div className="form-group mb-3">
                                <label>User Type</label>
                                <div className="row">
                                    <div className="form-check col-md-1">
                                        <input ref={organizerRef} className="form-check-input" type="radio" value="organizer" required />
                                        <label className="form-check-label">
                                            Organizer
                                        </label>
                                    </div>
                                    <div className="form-check col-md-1">
                                        <input ref={parentRef} className="form-check-input" type="radio" value="parent" required />
                                        <label className="form-check-label">
                                            Parent
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary mb-3">Register</button>
                            <div>
                                <p>Already Registered? <Link to="/login">Login to your account</Link>  </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;