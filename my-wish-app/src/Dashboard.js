import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <Container className="dashboard-container">
            <header className="dashboard-header">
                <h2>Wishes</h2>
            </header>
            <div className="dashboard-content">
                <div className="wish-list">
                    <h3>MY CURRENT WISH LIST</h3>
                    <ul>
                        <li>Aller à la salle deux fois par semaine - Fait le 03/02/2025</li>
                        <li>Passer des moments avec Salomé pour la saint Valentin - Fait le 01/01/2025</li>
                        <li>Passer ma certification Java avec brio - Fait le 03/02/2025</li>
                    </ul>
                    <Button variant="dark">SEE MORE</Button>
                </div>
                <div className="make-wish">
                    <h3>MAKE A WISH</h3>
                    <Form>
                        <Form.Group controlId="wishTitle">
                            <Form.Control type="text" placeholder="Title" />
                        </Form.Group>
                        <Form.Group controlId="wishDescription">
                            <Form.Control as="textarea" placeholder="Description" rows={3} />
                        </Form.Group>
                        <Button variant="secondary" type="submit">SUBMIT</Button>
                    </Form>
                </div>
            </div>
        </Container>
    );
};

export default Dashboard;