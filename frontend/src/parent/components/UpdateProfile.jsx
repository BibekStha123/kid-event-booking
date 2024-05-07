import React, { useState } from 'react';
import { useStateContext } from '../../ContextProvider';
import axiosClient from '../../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UpdateProfile(props) {

    const { users, setUsers } = useStateContext()
    const navigate = useNavigate()
    const [errors, setErrors] = useState();

    const handleSubmit = (e) => {
        e.preventDefault()

        axiosClient.post(`/update-profile/${users.id}`, users)
            .then(({ data }) => {
                toast.success(data.message)
                navigate('/dashboard')
            })
            .catch(({ response }) => {
                setErrors(response.data.errors)
                toast.error("Please check the information provided")
            })
    }

    return (
        <div className="container p-5">
            <div className="card">
                <h2 className="text-center my-4">Update Profile</h2>
                <div className="card-body p-4 py-0">
                    {errors && <div>
                        {Object.keys(errors).map(key => (
                            <p className='text-danger text-center' key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input className="form-control" type='text' required value={users.name} onChange={e => setUsers({ ...users, name: e.target.value })} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input className="form-control" type='email' required value={users.email} onChange={e => setUsers({ ...users, email: e.target.value })} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Address</label>
                            <input className="form-control" required value={users.address} onChange={e => setUsers({ ...users, address: e.target.value })} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Contact Number</label>
                            <input className="form-control" required value={users.contact_no} onChange={e => setUsers({ ...users, contact_no: e.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;