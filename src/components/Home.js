import React from 'react';

function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="display-4">Welcome to Your Website</h1>
                            <p className="lead">Your catchphrase or brief description can go here.</p>
                            <a href="#" className="btn btn-primary btn-lg">
                                Learn More
                            </a>
                        </div>
                        <div className="col-lg-6"></div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container">
                <div className="row mt-5">
                    <div className="col">
                        <h2>About Us</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis urna eget ex
                            placerat vestibulum.
                        </p>
                    </div>
                    <div className="col">
                        <h2>Our Services</h2>
                        <ul>
                            <li>Service 1</li>
                            <li>Service 2</li>
                            <li>Service 3</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h2>Contact Us</h2>
                        <p>Email: info@example.com</p>
                        <p>Phone: 123-456-7890</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
