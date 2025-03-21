import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.text();

    if (response.status === 200) {
      setMessage('Connexion réussie');
      navigate('/page-une');
    } else {
      setMessage(data);
    }
  };

  return (
    <Container className="login-container d-flex align-items-center justify-content-center vh-100">

<div className="bubbles-background">
  {[...Array(26)].map((_, i) => {
    const size = Math.random() * 200 + 20; 
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


      <Row className="w-100 justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow login-card">
            <h2 className="text-center mb-4">Connexion</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email :</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Mot de passe :</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="dark" type="submit" className="w-100">
                Se connecter
              </Button>
            </Form>
            {message && <p className="text-center mt-3 text-danger">{message}</p>}
          </Card>
        </Col>
      </Row>
    </Container>



  );
}

export default LoginPage;