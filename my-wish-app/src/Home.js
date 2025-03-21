import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

const Home = () => {
  return (
    <Container className="home-container text-center">
      <div className="bubbles-background">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 80 + 20;
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
      {/* Correction du chemin vers la page de connexion */}
      <Link to="/login" className="btn btn-dark get-started">
        GET STARTED
      </Link>
    </Container>
  );
};

export default Home;
