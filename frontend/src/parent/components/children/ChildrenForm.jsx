import React, { useState } from 'react';
import axiosClient from '../../../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ChildrenForm(props) {

    const navigate = useNavigate();
    const [children, setChildren] = useState({
        name: '',
        gender: '',
        dob: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosClient.post('/children', children)
            .then(({ data }) => {
                toast.success(data.message)
                navigate('/children')
            })
            .error(({response}) => {
                console.log(response)
                // toast.error()
            })
    }

    return (
        <div className="container p-5">
            <div className="card">
                <h2 className="text-center my-4">Add Child</h2>
                <div className="card-body p-4 py-0">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input className="form-control" placeholder="Name" required value={children.name} onChange={e => setChildren({ ...children, name: e.target.value })} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Gender</label>
                            <div className="row">
                                <div className="form-check col-md-1">
                                    <input className="form-check-input" type="radio" name={children.gender} value="male" onChange={e => setChildren({ ...children, gender: e.target.value })} />
                                    <label className="form-check-label">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check col-md-1">
                                    <input className="form-check-input" type="radio" name={children.gender} value="female" onChange={e => setChildren({ ...children, gender: e.target.value })} />
                                    <label className="form-check-label">
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label>Date of Birth</label>
                            <input type="date" className="form-control" required value={children.dob} onChange={e => setChildren({ ...children, dob: e.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChildrenForm;