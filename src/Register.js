import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './Register.css';

const Register = () => {
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

            <Container className="register-container d-flex align-items-center justify-content-center min-vh-100">
                <Card className="p-4 register-card shadow">
                    <h2 className="text-center mb-4">CREATE AN ACCOUNT</h2>
                    <Form>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>E-MAIL :</Form.Label>
                            <Form.Control type="email" placeholder="johndoe@gmail.com" />
                        </Form.Group>

                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label>IDENTIFIANT :</Form.Label>
                            <Form.Control type="text" placeholder="Johny" />
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>MOT DE PASSE :</Form.Label>
                            <Form.Control type="password" placeholder="******" />
                        </Form.Group>

                        <Form.Group controlId="confirmPassword" className="mb-4">
                            <Form.Label>CONFIRMATION DU MOT DE PASSE :</Form.Label>
                            <Form.Control type="password" placeholder="******" />
                        </Form.Group>

                        <div className="button-group d-flex justify-content-between">
                            <Button variant="dark" type="submit">CREATE</Button>
                            <Button variant="secondary" type="button">CANCEL</Button>
                        </div>
                    </Form>
                </Card>
            </Container>
        </>
    );
};

export default Register;