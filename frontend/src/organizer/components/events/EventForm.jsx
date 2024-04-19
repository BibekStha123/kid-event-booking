import React, { useEffect, useRef, useState } from 'react';
import axiosClient from '../../../api/axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function EventForm(props) {

    const navigate = useNavigate()
    const param = useParams()
    const [event, setEvent] = useState()

    const nameRef = useRef();
    const datetimeRef = useRef();
    const locationRef = useRef();
    const ageRef = useRef();
    const amountRef = useRef();
    const descriptionRef = useRef();

    useEffect(() => {
        axiosClient.get('/events/' + param.id)
            .then(({ data }) => {
                setEvent(data.event)
            })
            .catch((error) => {
                console.log(error)
            })
    })

    const eventHandler = (e) => {
        e.preventDefault()

        const payload = {
            name: nameRef.current.value,
            date_time: datetimeRef.current.value,
            location: locationRef.current.value,
            age: ageRef.current.value,
            amount: amountRef.current.value,
            description: descriptionRef.current.value,
        }

        if (!event) {
            axiosClient.post('/events', payload)
                .then(({ data }) => {
                    toast.success(data.message)
                    navigate('/events')
                })
                .catch((error) => {
                    console.error(error)
                })
        } else {
            axiosClient.put('/events' + param.id, payload)
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
                <h2 className="text-center my-4">Create Event</h2>
                <div className="card-body p-4 py-0">
                    <form onSubmit={eventHandler}>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" ref={nameRef} className="form-control" placeholder="Name" required value={event?.name} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Date Time</label>
                            <input type="datetime-local" ref={datetimeRef} className="form-control" required value={event?.date_time} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Location</label>
                            <input type="text" ref={locationRef} className="form-control" placeholder="Location" required value={event?.location} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Age</label>
                            <input type="text" ref={ageRef} className="form-control" placeholder="Age" required value={event?.age} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Amount</label>
                            <input type="text" ref={amountRef} className="form-control" placeholder="Amount" required value={event?.amount} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea type="text" ref={descriptionRef} className="form-control" placeholder="Description" required value={event?.description} />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EventForm;