import React from "react";
import { Link} from "react-router-dom";


import "./AboutUsPage.css";


class AboutUsPage extends React.Component {

    render() {
        return (
            <div className="main-page">
                <h1 className="title-about">About us</h1>
                <p className="info-prod">
                    <span>This project was created for successful employment in an IT company.</span>
                    <span>
                        All development was done by one developer. One person is responsible for the entire development.
                    </span>
                    <span>He can be contacted using the contact information below.</span>
                </p>

                <div className="contacts">
                    <p className="contacts-title">Our contacts</p>

                    <p className="contact">
                        Telegram:
                        <Link className="link" to="https://t.me/dmitryklivchinsky">
                            https://t.me/dmitryklivchinsky
                        </Link>
                    </p>

                    <p className="contact">
                        GitHub:
                        <Link className="link" to="https://github.com/Lanterman">
                            https://github.com/Lanterman
                        </Link>
                    </p>
                    <p className="contact">
                        Phone number:
                        <span className="phone">+375336842017</span>
                    </p>
                </div>

                <div className="team">
                    <p className="team-title">Our team</p>

                    <p className="people">
                        CEO:
                        <span className="full-name">Klivchinsky Dmitry Alexandrovich</span>
                    </p>

                    <p className="people">
                        Backend:
                        <span className="full-name">Klivchinsky Dmitry Alexandrovich</span>
                    </p>

                    <p className="people">
                        Frontend:
                        <span className="full-name">Klivchinsky Dmitry Alexandrovich</span>
                    </p>

                    <p className="people">
                        QA engineer:
                        <span className="full-name">Klivchinsky Dmitry Alexandrovich</span>
                    </p>
                </div>
            </div>
        );
    };
};

export default AboutUsPage;
