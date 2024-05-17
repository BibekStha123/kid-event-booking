import React, { useState } from 'react';
import axiosClient from '../../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Feedback(props) {

    const [data, setData] = useState({
        feedback: ''
    })

    const navigate = useNavigate()

    const formHandler = (e) => {
        e.preventDefault()
        axiosClient.post('/feedback', data)
            .then(({ data }) => {
                toast.success(data.message)
                navigate('/dashboard')
            })
            .catch((error) => {
                toast.error('Something went wrong')
                console.log(error);
            })
    }

    return (
        <div className="container p-5">
            <div className="card">
                <h2 className="text-center my-4">Feedback Form</h2>
                <div className="card-body p-4 py-0">
                    <form onSubmit={formHandler}>
                        <div className="form-group mb-3">
                            <label>Your Feedback</label>
                            <textarea className="form-control" placeholder="Express what you feel..." required value={data.feedback} onChange={e => setData({ ...data, feedback: e.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Feedback;