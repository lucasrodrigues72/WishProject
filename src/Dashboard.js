import React, { useState } from 'react';
import { Container, Button, Form, Navbar, Nav } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
  const [wishTitle, setWishTitle] = useState('');
  const [expanded, setExpanded] = useState(false);

  const wishes = [
    "Souhait 1 - Fait le 01/01/2025",
    "Souhait 2 - Fait le 02/01/2025",
    "Souhait 3 - Fait le 03/01/2025",
    "Souhait 4 - Fait le 04/01/2025",
    "Souhait 5 - Fait le 05/01/2025",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (wishTitle.trim()) {
      alert('Wish created');
      setWishTitle('');
    }
  };

  const displayedWishes = expanded ? wishes : wishes.slice(-3);

  return (
    <>
      <div className="bubbles-background">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 150 + 20;
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

      <Navbar bg="dark" variant="dark" expand="lg" className="dashboard-header">
        <Navbar.Brand>JOHN DOE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Button className="logout-button">Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="dashboard-container">
        <div className="dashboard-content">
          <div className={`wish-list ${expanded ? 'expanded' : ''}`}>
            <h3>Wish list</h3>
            <ul>
              {displayedWishes.map((wish, index) => (
                <li key={index}>{wish}</li>
              ))}
            </ul>
            <Button variant="light" onClick={() => setExpanded(!expanded)}>
              {expanded ? 'See less' : 'See more'}
            </Button>
          </div>

          <div className="make-wish">
            <h3>MAKE A WISH</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="wishTitle" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Wish name"
                  value={wishTitle}
                  onChange={(e) => setWishTitle(e.target.value)}
                />
              </Form.Group>
              <Button variant="secondary" type="submit">Make a Wish</Button>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
