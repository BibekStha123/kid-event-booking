import React, { useEffect, useState } from 'react';
import banner from "../../assets/images/banner.jpg"
import eventImg from "../../assets/images/event.jpg"
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axios';

function Home() {

    const [events, setEvents] = useState([])

    useEffect(() => {
        axiosClient.get('/events')
            .then(({ data }) => {
                setEvents(data.events)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <main className="featured-event">
                <div className="featured-image">
                    <img src={banner} alt="kids playing" />
                </div>
                <div className="featured-description">
                    <h1 className="featured-heading">A Visit to the Botanical Garden</h1>
                    <p className="featured-text">
                        The Botanic Gardens and State Herbarium of South Australia comprises
                        three beautiful public gardens – Adelaide Botanic Garden (and
                        Botanic Park) in the city of Adelaide, Mount Lofty Botanic Garden in
                        the Adelaide Hills and Wittunga Botanic Garden in suburban
                        Blackwood.
                    </p>
                    <a href=""><div className="featured-cta">Join The Event</div></a>
                </div>
            </main>
            <section className="upcoming-events">
                <div className="upcoming-events-card upcoming-event-text">
                    <h2>
                        Upcoming <br />
                        Events
                    </h2>
                    <div className="upcoming-cta">
                        <Link to="/all-events">View All</Link>
                    </div>
                </div>
                {
                    events.map((event, index) => {
                        return (
                            <a href="" key={index}>
                                <div className="upcoming-event-one upcoming-events-card">
                                    <div className="bg-image">
                                        <img src={eventImg} alt="" />
                                    </div>
                                    <div className="event-date">Jan<br />1</div>
                                    <div className="event-info">
                                        <h3 className="event-name">{event.name}</h3>
                                        <p className="event-duration">Jan 1, 2024 - Jan 2, 2024</p>
                                    </div>
                                </div>
                            </a>
                        )
                    })
                }
            </section>
            <section className="testimonials">
                <div className="testimonials-title"><h2>What our Customers Think</h2></div>
                <div className="testimonials-card">
                    <p className="testimonials-text">
                        “Parents Review Template, Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Pellentesque vel quam a quam dignissim placerat vel
                        vel eros. Pellentesque ut sollicitudin nunc. Fusce faucibus leo
                        arcu, vitae porta erat rutrum sed. Etiam commodo eros ac iaculis.“
                    </p>
                    <p className="testimonials-parent-name">- Parents Name</p>
                </div>
            </section>
        </>
    );
}

export default Home;