import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './Register.css';

const Register = () => {
    return (
        <Container className="register-container">
            <h2 className="text-center">CREATE AN ACCOUNT</h2>
            <Form>
                <Form.Group controlId="email">
                    <Form.Label>E-MAIL :</Form.Label>
                    <Form.Control type="email" placeholder="johndoe@gmail.com" />
                </Form.Group>
                
                <Form.Group controlId="username">
                    <Form.Label>IDENTIFIANT :</Form.Label>
                    <Form.Control type="text" placeholder="Johny" />
                </Form.Group>
                
                <Form.Group controlId="password">
                    <Form.Label>MOT DE PASSE :</Form.Label>
                    <Form.Control type="password" placeholder="******" />
                </Form.Group>
                
                <Form.Group controlId="confirmPassword">
                    <Form.Label>CONFIRMATION DU MOT DE PASSE :</Form.Label>
                    <Form.Control type="password" placeholder="******" />
                </Form.Group>
                
                <div className="button-group">
                    <Button variant="dark" type="submit">CREATE</Button>
                    <Button variant="secondary" type="button">CANCEL</Button>
                </div>
            </Form>
        </Container>
    );
};

export default Register;
