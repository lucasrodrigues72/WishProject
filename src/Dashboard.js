import React, { useState, useEffect, useCallback } from "react";
import {
  Container, Button, Form, Navbar, Nav, InputGroup,
  Row, Col, Card
} from "react-bootstrap";
import { Calendar } from "react-bootstrap-icons";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [wishTitle, setWishTitle] = useState("");
  const [wishDate, setWishDate] = useState("");
  const [wishes, setWishes] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const userId = 1; // à remplacer par l'ID de l'utilisateur connecté

  // 🔄 Récupérer les vœux via API
  const fetchWishes = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/wishes", {
        params: { id_user: userId },
      });
      setWishes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des souhaits :", error.message);
    }
  }, [userId]);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  // 📤 Soumission d'un vœux
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!wishTitle || !wishDate) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/wishes", {
        title: wishTitle,
        target_date: wishDate,
        id_user: userId,
      });
      setWishTitle("");
      setWishDate("");
      fetchWishes();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du souhait :", error.response?.data || error.message);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // 📅 Filtrage par mois
  const filteredWishes = selectedMonth
    ? wishes.filter(
        (wish) => new Date(wish.target_date).getMonth() + 1 === parseInt(selectedMonth)
      )
    : wishes;

  const displayedWishes = expanded ? filteredWishes : filteredWishes.slice(-3);

  // 📊 Générer données pour graphique
  const wishCountsByMonth = Array(12).fill(0);
  wishes.forEach(wish => {
    const date = new Date(wish.target_date);
    const month = date.getMonth();
    wishCountsByMonth[month]++;
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

              <Form.Group controlId="filterByMonth" className="mb-3">
                <Form.Select value={selectedMonth} onChange={handleMonthChange}>
                  <option value="">Tous les mois</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {new Date(0, i).toLocaleString("fr-FR", { month: "long" })}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <ul className="ps-3">
                {displayedWishes.map((wish) => (
                  <li key={wish.id} className="mb-2">
                    {wish.title} — Rentré :{" "}
                    {new Date(wish.created_at).toLocaleDateString()} — Réalisation :{" "}
                    {new Date(wish.target_date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
              {filteredWishes.length > 3 && (
                <Button variant="light" onClick={() => setExpanded(!expanded)}>
                  {expanded ? "Voir moins" : "Voir plus"}
                </Button>
              )}
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

                <Button variant="secondary" type="submit">
                  Créer le vœux
                </Button>
              </Form>
            </div>
          </Col>
        </Row>

        {/* 📊 Graphique */}
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