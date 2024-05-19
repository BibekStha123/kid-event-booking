import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axios';
import eventImg from "../../assets/images/event.jpg"
import calendarImg from "../../assets/icons/calendar.svg"
import clockImg from "../../assets/icons/clock.svg"
import searchImg from "../../assets/icons/search.svg"
import { Link } from 'react-router-dom';

function Events(props) {

    const [events, setEvents] = useState([]);

    function getEvents() {
        axiosClient.get('/events')
            .then(({ data }) => {
                setEvents(data.events)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getEvents()
    }, [])

    const filterEvents = (e) => {
        const searchKey = e.target.value;
        console.log(e);
        if (searchKey.length === 0) {
            getEvents()
        } else {
            const filteredEvents = events.filter((event) => {
                return event.name.toLowerCase().includes(searchKey.toLowerCase())
            })
            setEvents(filteredEvents)
        }
    }

    const getDateTime = (date_time) => {

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const date = new Date(date_time)
        const year = date.getFullYear()
        const monthIndex = date.getMonth();
        const monthName = monthNames[monthIndex]
        const day = date.getDate();

        let hour = date.getHours();
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12;
        hour = hour < 10 ? '0' + hour : hour
        let minutes = date.getMinutes()
        minutes = minutes < 10 ? '0' + minutes : minutes

        return day + ' ' + monthName + ' ' + year + ', ' + hour + ':' + minutes + ' ' + ampm
    }

    return (

        <main className="event-container">
            <div className="search-container">
                <p className="search-container-title">
                    Search for events, Join the thrill
                </p>
                <div className="event-search-form">
                    <form action="" method="get">
                        <img
                            src={searchImg}
                            alt="search icon"
                            className="search-icon"
                        />
                        <input type="search" placeholder='Search Events' onChange={filterEvents} name="" id="event-search-string" />
                    </form>
                </div>
            </div>
            <div className="event-list-container">
                <div className="event-list-container-container">
                    {
                        events.map((event, index) => {
                            return (
                                <Link to={`/event-details/` + event.id} key={index}>
                                    <div className="event-list-card">
                                        <div className="event-list-image-card">
                                            <img src={eventImg} alt="" />
                                        </div>
                                        <div className="event-list-info-card">
                                            <h2 className="event-list-name">{event.name}</h2>
                                            <p className="event-list-price">AUD ${event.amount}</p>
                                            <div className="event-list-date-time">
                                                <div className="event-list-date-time-text">
                                                    <img src={calendarImg} alt="" /> {getDateTime(event.date_time)}
                                                </div>
                                                {/* <div className="event-list-duration">
                                                    <img src={clockImg} alt="" /> 1h
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <br/>
                <br/>
                <div className="pagination-events-page">
                    {/* <a href=""><div className="page-numbers">1</div></a>
                    <a href=""><div className="page-numbers">2</div></a>
                    <a href=""><div className="page-numbers">3</div></a>
                    <a href=""><div className="page-numbers">4</div></a>
                    <a href=""><div className="page-numbers">5</div></a> */}
                </div>
            </div>
        </main>
    );
}

export default Events;