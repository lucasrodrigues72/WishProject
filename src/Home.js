import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './Home.css';

const Home = () => {
    return (
        <Container className="home-container text-center">
             <div className="bubbles-background">
  {[...Array(20)].map((_, i) => {
    const size = Math.random() * 150 + 20; // tailles entre 20px et 100px
    return (
      <div
        key={i}
        className="bubble"
        style={{
          left: `${Math.random() * 100}vw`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${Math.random() * 15 + 10}s`,
          animationDelay: `${Math.random() * 20}s`,
        }}
      />
    );
  })}
</div>
            <h1>NEMA WEB GROUP</h1>
            <h2>Want to make a wish?</h2>
            <p>You've come to the right place.</p>
            <Button variant="dark" className="get-started">GET STARTED</Button>
        </Container>
    );
};

export default Home;
