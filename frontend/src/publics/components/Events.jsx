import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axios';

function Events(props) {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axiosClient.get('/events')
            .then(({ data }) => {
                setEvents(data.events)
                console.log(data.events)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <main className="event-container">
            <div className="search-container">
                <p className="search-container-title">
                    Search for events, Join the thrill
                </p>
                <div className="event-search-form">
                    <form action="" method="get">
                        <img
                            src="../assets/icons/search.svg"
                            alt="search icon"
                            className="search-icon"
                        />
                        <input type="search" name="" id="event-search-string" />
                        <input type="submit" value="Search" className="event-search-btn" />
                    </form>
                </div>
            </div>
            <div className="event-list-container">
                <div className="event-list-container-container">
                    {
                        events.map((event, index) => {
                            <a href="" key={index}>
                                <div className="event-list-card">
                                    <div className="event-list-image-card">
                                        <img src="../assets/images/event 1.jpg" alt="" />
                                    </div>
                                    <div className="event-list-info-card">
                                        <h2 className="event-list-name">{event.name}</h2>
                                        <p className="event-list-price">AUD $20</p>
                                        <div className="event-list-date-time">
                                            <div className="event-list-date-time-text">
                                                <img src="../assets/icons/calendar.svg" alt="" /> 15 Jan -
                                                Fri, 3:00 PM
                                            </div>
                                            <div className="event-list-duration">
                                                <img src="../assets/icons/clock.svg" alt="" /> 1h
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
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