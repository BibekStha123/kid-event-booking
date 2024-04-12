import React, { useRef } from 'react';
import axiosClient from '../../api/axios';

function Register() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmatiomRef = useRef();
    const addressRef = useRef();
    const contactRef = useRef();
    const organizerRef = useRef();
    const parentRef = useRef();

    const onSubmit = (e) => {
        e.preventDfault

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            address: addressRef.current.value,
            contact_no: contactRef.current.value,
            user_type: organizerRef.current.checked ? organizerRef.current.value : parentRef.current.value
        }

        axiosClient.post('/register', payload)
            .then(({ data }) => {
                alert(data)
                console.log(data);
            }).catch((error) => {
                console.log(error)
            })
    }


    return (
        <div>
            <div className="container p-5">
                <div className="card">
                    <h2 className="text-center my-4">Register</h2>
                    <div className="card-body p-4 py-0">
                        <form onSubmit={onSubmit}>
                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input ref={nameRef} type="text" className="form-control" placeholder="Enter Name" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Email address</label>
                                <input ref={emailRef} type="email" className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input ref={passwordRef} type="password" className="form-control" placeholder="Password" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Confirm Password</label>
                                <input ref={passwordConfirmatiomRef} type="password" className="form-control" placeholder="Password Confirmation" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Address</label>
                                <input ref={addressRef} type="text" className="form-control" placeholder="Address" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Contact Number</label>
                                <input ref={contactRef} type="text" className="form-control" placeholder="Contact Number" />
                            </div>
                            <div className="form-group mb-3">
                                <label>User Type</label>
                                <div className="row">
                                    <div className="form-check col-md-1">
                                        <input ref={organizerRef} className="form-check-input" type="radio" value="organizer" />
                                        <label className="form-check-label">
                                            Organizer
                                        </label>
                                    </div>
                                    <div className="form-check col-md-1">
                                        <input ref={parentRef} className="form-check-input" type="radio" value="parent" />
                                        <label className="form-check-label">
                                            Parent
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button className="btn btn-primary mb-3">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;