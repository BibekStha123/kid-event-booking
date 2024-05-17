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
                                <Link to={`/event/` + event.id} key={index}>
                                    <div className="event-list-card">
                                        <div className="event-list-image-card">
                                            <img src={eventImg} alt="" />
                                        </div>
                                        <div className="event-list-info-card">
                                            <h2 className="event-list-name">{event.name}</h2>
                                            <p className="event-list-price">AUD $20</p>
                                            <div className="event-list-date-time">
                                                <div className="event-list-date-time-text">
                                                    <img src={calendarImg} alt="" /> 15 Jan -
                                                    Fri, 3:00 PM
                                                </div>
                                                <div className="event-list-duration">
                                                    <img src={clockImg} alt="" /> 1h
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="pagination-events-page">
                    <a href=""><div className="page-numbers">1</div></a>
                    <a href=""><div className="page-numbers">2</div></a>
                    <a href=""><div className="page-numbers">3</div></a>
                    <a href=""><div className="page-numbers">4</div></a>
                    <a href=""><div className="page-numbers">5</div></a>
                </div>
            </div>
        </main>
    );
}

export default Events;