import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './Home.css';

const Home = () => {
    return (
        <Container className="home-container text-center">
            <h1>NEMA WEB GROUP</h1>
            <h2>Want to make a wish?</h2>
            <p>You've come to the right place.</p>
            <Button variant="dark" className="get-started">GET STARTED</Button>
        </Container>
    );
};

export default Home;
