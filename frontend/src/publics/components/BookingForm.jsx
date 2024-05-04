import React, { useEffect, useState } from 'react';
import { isAuthenticated, isOrganizer } from '../../helpers';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosClient from '../../api/axios';
import Dropdown from 'react-bootstrap/Dropdown'

function BookingForm(props) {

    const navigate = useNavigate()
    const { id } = useParams()
    const [children, setChildren] = useState([]);
    const [eventName, setEventName] = useState('')
    const [child, setChild] = useState('')

    useEffect(() => {
        if (!isAuthenticated()) {
            toast.success("Please login before booking the event")
            navigate('/login')
        }

        axiosClient.get(`/events/${id}`)
            .then(({ data }) => {
                setEventName(data.event.name)
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

    }

    const dropdownHandler = (childName) => {
        setChild(childName)
    }

    console.log(children)

    return (
        <div className="container p-5">
            <div className="card">
                <h2 className="text-center my-4">Booking Form</h2>
                <div className="card-body p-4 py-0">
                    {/* {errors && <div>
                        {Object.keys(errors).map(key => (
                            <p className='text-danger text-center' key={key}>{errors[key][0]}</p>
                        ))}
                    </div>} */}
                    <form onSubmit={onSubmit}>
                        <div className="form-group mb-3">
                            <label>Event Name</label>
                            <input readOnly value={eventName} type="text" className="form-control" placeholder="Enter Name" required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Child Name</label>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {child ? child : 'Select Child'}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        children.map((c, index) => {
                                            return (
                                                <Dropdown.Item key={index} onClick={dropdownHandler(c.name)}>{c.name}</Dropdown.Item>
                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="form-group mb-3">
                            <label>Child Age</label>
                            <input readOnly type="text" className="form-control" placeholder="Enter Name" required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Emergency Contact Number</label>
                            <input type="text" className="form-control" placeholder="Enter Name" required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Special Needs</label>
                            <input type="text" className="form-control" placeholder="Enter Name" required />
                        </div>
                        <button className="btn btn-primary mb-3">Book</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookingForm;