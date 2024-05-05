import React from 'react';
import { Link, Outlet } from 'react-router-dom'
// import '../css/main.css'
// import '../css/events.css'
import { facebook, instagram, linkedin, logo, menuClose, menuOpen, twitter, youtube } from '../../assets/icons';
import { isAuthenticated } from '../../helpers';

function PublicLayout(props) {
    return (
        <div className='container'>
            <header>
                <div className="header-left">
                    <Link to="/">
                        <img src={logo} alt="Brand Logo"
                        />
                    </Link>
                </div>
                <div className="header-right">
                    <div className="menu-open">
                        <img src={menuOpen} alt="" />
                    </div>
                    <nav>
                        <ul>
                            <li className="menu-close">
                                <img src={menuClose} alt="" />
                            </li>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/events">Events</Link>
                            </li>
                            <li>
                                <Link to="/about-us">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contact-us">Contact Us</Link>
                            </li>
                            {
                                isAuthenticated() ? ''
                                :
                                <>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register">Register</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
            <footer>
                <div className="footer-card">
                    <div className="about-us">
                        <h3>About Us</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                            veritatis harum dolores laboriosam? Alias dolorem, porro, dolore
                            odio nulla nam vitae explicabo provident quasi rem necessitatibus
                            accusantium veritatis hic sequi?
                        </p>
                    </div>
                    <div className="follow-us">
                        <h3>Follow Us</h3>
                        <div className="follow-us-items">
                            <a href="">
                                <div><img src={facebook} alt="" /></div>
                            </a>
                            <a href="">
                                <div><img src={twitter} alt="" /></div>
                            </a>
                            <a href="">
                                <div><img src={instagram} alt="" /></div>
                            </a>
                            <a href="">
                                <div><img src={linkedin} alt="" /></div>
                            </a>
                            <a href="">
                                <div><img src={youtube} alt="" /></div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="copyright-text">
                    <p>
                        © 2024 VTA Pty Ltd. Trademarks and brands are the property of their
                        respective owners.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default PublicLayout;