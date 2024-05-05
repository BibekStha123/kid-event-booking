import React, { useEffect, useState } from 'react';
import axiosClient from '../../../api/axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function EventForm(props) {

    const navigate = useNavigate()
    const { id } = useParams()
    const [event, setEvent] = useState({
        id:null,
        name: '',
        date_time: '',
        location: '',
        age: '',
        amount: '',
        description: ''
    })

    //get event for editing only if id exist
    if (id) {
        useEffect(() => {
            axiosClient.get(`/events/${id}`)
                .then(({ data }) => {
                    setEvent(data.event)
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    const eventHandler = (e) => {
        e.preventDefault()

        if (!id) {
            axiosClient.post('/events', event)
                .then(({ data }) => {
                    toast.success(data.message)
                    navigate('/events')
                })
                .catch((error) => {
                    console.error(error)
                })
        } else {
            axiosClient.put(`/events/${id}`, event)
                .then(({ data }) => {
                    toast.success(data.message)
                    navigate('/events')
                })
                .catch((error) => {
                    console.error(error)
                })
        }

    }

    return (
        <div className="container p-5">
            <div className="card">
                <h2 className="text-center my-4">{id ? 'Update ' + event.name : 'Create Event'} </h2>
                <div className="card-body p-4 py-0">
                    <form onSubmit={eventHandler}>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input className="form-control" placeholder="Name" required value={event.name} onChange={ev => setEvent({ ...event, name: ev.target.value })} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Date Time</label>
                            <input type="datetime-local" className="form-control" required value={event.date_time} onChange={ev => setEvent({ ...event, date_time: ev.target.value })} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Location</label>
                            <input className="form-control" placeholder="Location" required value={event.location} onChange={ev => setEvent({ ...event, location: ev.target.value })} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Age</label>
                            <input type='number' className="form-control" placeholder="Age" required value={event.age} onChange={ev => setEvent({ ...event, age: ev.target.value })} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Amount</label>
                            <input className="form-control" placeholder="Amount" required value={event.amount} onChange={ev => setEvent({ ...event, amount: ev.target.value })} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea className="form-control" placeholder="Description" required value={event.description} onChange={ev => setEvent({ ...event, description: ev.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EventForm;