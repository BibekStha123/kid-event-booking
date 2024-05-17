import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../../api/axios';

function Event(props) {

    const { id } = useParams();
    const [event, setEvent] = useState([])

    useEffect(() => {
        axiosClient.get(`/events/${id}`)
            .then(({ data }) => {
                console.log("here");
                setEvent(data.event)
            })
            .catch(({ error }) => {
                console.log(error);
            })
    }, [id])

    const getDateTime = () => {

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const date = new Date(event.date_time)
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
        <div className="page-container">
            <section className="event-intro">
                <div className="event-introduction">
                    {/* <div className="event-date">
                        <span className="event-date-month">JAN</span>
                        <div className="event-date-line"></div>
                        <span className="event-date-day">1</span>
                    </div> */}
                    <h2 className="event-title">{event.name}</h2>
                </div>
                <div className="main-content">
                    <article className="content-sections">
                        <div className="event-description">
                            <div className="description-content">
                                <img loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f57b64076ece9ad8aa68cae4d79d46535b936bd9a9b71f982ee8af4348e2937e?apiKey=049b84acd4164b8f80eaafc13766e476&"
                                    alt="Botanical Garden Image" className="event-image" />
                                <section className="description-box">
                                    <h3 className="description-title">About This Event</h3>
                                    <p className="description-text">
                                        {event.description}
                                    </p>
                                </section>
                            </div>
                        </div>
                        <aside className="event-details">
                            <div className="details-box">
                                <h3 className="details-title">Event Details</h3>
                                <div className="details-content">
                                    <div className="vec-event-organizer vec-bold">
                                        Organised By:
                                        <p className="vec-not-bold">{event.user ? event.user.name : 'loading...'}</p>
                                    </div>
                                    <div className="vec-event-date-time vec-bold">
                                        Date and Time:
                                        <p className="vec-not-bold">{getDateTime()}</p>
                                    </div>
                                    <div className="vec-event-location vec-bold">
                                        Location:
                                        <p className="vec-not-bold">{event.location}</p>
                                    </div>
                                    <div className="vec-event-price vec-bold">
                                        Price:
                                        <p className="vec-not-bold">AUD ${event.amount}</p>
                                    </div>
                                    <div className="vec-age-limit vec-bold">
                                        Age:
                                        <p className="vec-not-bold">{event.age} years old only</p>
                                    </div>
                                </div>
                                <div className="vec-event-details-book-now-btn">
                                    <Link to={`/book-event/`+ event.id}>
                                        <button className="book-button" tabIndex="0">Book Event</button>
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </article>
                </div>
            </section>
        </div>
    );
}

export default Event;