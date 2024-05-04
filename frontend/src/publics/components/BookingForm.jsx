import React, { useEffect, useRef, useState } from 'react';
import { isAuthenticated, isOrganizer } from '../../helpers';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosClient from '../../api/axios';
import Dropdown from 'react-bootstrap/Dropdown'

function BookingForm(props) {

    const navigate = useNavigate()
    const { id } = useParams()
    const [children, setChildren] = useState([]);
    const [event, setEvent] = useState([])
    const [childAge, setChildAge] = useState(null)
    const [errors, setErrors] = useState();

    const eventRef = useRef()
    const childRef = useRef()
    const specialNeedRef = useRef()
    const emergencyContactRef = useRef()


    useEffect(() => {
        if (!isAuthenticated()) {
            toast.success("Please login before booking the event")
            navigate('/login')
        }

        axiosClient.get(`/events/${id}`)
            .then(({ data }) => {
                setEvent(data.event)
            })
            .catch(({ error }) => {
                console.log(error);
            })

        axiosClient.get('children')
            .then(({ data }) => {
                setChildren(data.children)
            })
            .catch(({ error }) => {
                console.log(error);
            })

    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            event_id: eventRef.current.value,
            children_id: childRef.current.value,
            special_needs: specialNeedRef.current.value,
            emergency_contact_no: emergencyContactRef.current.value,
        }

        axiosClient.post('/bookings', payload)
        .then(({data}) => {
            toast.success(data.message)
        })
        .catch(({response}) => {
            setErrors(response.data.errors)
                toast.error("Please check the information provided")
        })
    }

    const childNameHandler = (e) => {
        const childId = e.target.value
        const filteredChild = children.filter((child) => {
            return child.id == childId
        })
        setChildAge(filteredChild[0].age)
    }

    return (
        <div className="container p-5">
            <div className="card">
                <h2 className="text-center my-4">Booking Form</h2>
                <div className="card-body p-4 py-0">
                    {errors && <div>
                        {Object.keys(errors).map(key => (
                            <p className='text-danger text-center' key={key}>{errors[key][0]}</p>
                        ))}
                    </div>}
                    <form onSubmit={onSubmit}>
                        <div className="form-group mb-3">
                            <label>Event Name</label>
                            <input hidden ref={eventRef} value={event.id}/>
                            <input readOnly value={event.name} type="text" className="form-control" placeholder="Enter Name" required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Child Name</label>
                            <select className="form-select" onChange={childNameHandler} ref={childRef}>
                                <option value="">--Select Child--</option>
                                {
                                    children.map((c, index) => {
                                        return (
                                            <option value={c.id} key={index}>{c.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label>Child Age</label>
                            <input readOnly value={childAge} type="text" className="form-control" placeholder="Enter Name" required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Emergency Contact Number</label>
                            <input type="text" ref={emergencyContactRef} className="form-control" placeholder="Enter Name" required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Special Needs</label>
                            <input type="text" ref={specialNeedRef} className="form-control" placeholder="Enter Name" required />
                        </div>
                        <button className="btn btn-primary mb-3">Book</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookingForm;