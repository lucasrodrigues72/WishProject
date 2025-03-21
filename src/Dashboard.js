import React, { useState } from 'react';
import {
  Container, Button, Form, Navbar, Nav, InputGroup,
  Row, Col, Card
} from 'react-bootstrap';
import { Calendar } from 'react-bootstrap-icons';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [wishTitle, setWishTitle] = useState('');
  const [wishDate, setWishDate] = useState('');
  const [expanded, setExpanded] = useState(false);

  const wishes = [
    "Souhait 1 - Fait le 01/01/2025",
    "Souhait 2 - Fait le 02/01/2025",
    "Souhait 3 - Fait le 03/03/2025",
    "Souhait 4 - Fait le 17/03/2025",
    "Souhait 5 - Fait le 21/06/2025",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (wishTitle.trim() && wishDate) {
      alert(`Vœux créé pour le ${wishDate}`);
      setWishTitle('');
      setWishDate('');
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const displayedWishes = expanded ? wishes : wishes.slice(-3);

  // ✅ Calcul des vœux par mois
  const wishCountsByMonth = Array(12).fill(0);
  wishes.forEach(wish => {
    const match = wish.match(/Fait le (\d{2})\/(\d{2})\/(\d{4})/);
    if (match) {
      const month = parseInt(match[2], 10) - 1;
      if (month >= 0 && month < 12) {
        wishCountsByMonth[month]++;
      }
    }
  });

  const chartData = [
    'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
    'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'
  ].map((month, index) => ({
    name: month,
    vœux: wishCountsByMonth[index],
  }));

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

      <Container className="dashboard-container py-5">
        <Row className="gx-5 mb-4">
          <Col md={6}>
            <div className={`wish-list p-4 rounded bg-dark text-white h-100`}>
              <h3 className="mb-4">Liste des vœux</h3>
              <ul className="ps-3">
                {displayedWishes.map((wish, index) => (
                  <li key={index} className="mb-2">{wish}</li>
                ))}
              </ul>
              <Button variant="light" onClick={() => setExpanded(!expanded)}>
                {expanded ? 'Voir moins' : 'Voir plus'}
              </Button>
            </div>
          </Col>

          <Col md={6}>
            <div className="make-wish p-4 rounded bg-dark text-white h-100">
              <h3 className="mb-4">Faire un vœux</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="wishTitle" className="mb-3">
                  <Form.Label>Titre du vœux</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex : Apprendre React"
                    value={wishTitle}
                    onChange={(e) => setWishTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="wishDate" className="mb-4">
                  <Form.Label>Date de réalisation du vœux</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="date"
                      value={wishDate}
                      onChange={(e) => setWishDate(e.target.value)}
                    />
                    <InputGroup.Text>
                      <Calendar />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Button variant="secondary" type="submit">Créer le vœux</Button>
              </Form>
            </div>
          </Col>
        </Row>

        {/* ✅ Carte Graphique */}
        <Card className="p-4 mt-4">
          <h4 className="mb-3">Statistiques des vœux par mois</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="vœux" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Container>
    </>
  );
};

export default Dashboard;
