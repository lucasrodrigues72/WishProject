import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Form } from "react-bootstrap";
import "./Dashboard.css";

const Dashboard = () => {
  const [wishTitle, setWishTitle] = useState("");
  const [wishes, setWishes] = useState([]);
  const [userId, setUserId] = useState(1); // Remplace 1 par l'id de l'utilisateur connecté si tu veux le récupérer dynamiquement

  // Fonction pour récupérer les souhaits depuis la BDD
  const fetchWishes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/wishes", {
        params: { id_user: userId },
      });
      setWishes(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des souhaits :",
        error.message
      );
    }
  };

  useEffect(() => {
    fetchWishes();
  }, [userId]);

  // Fonction d'envoi du souhait
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/wishes", {
        title: wishTitle,
        id_user: userId, // Envoi l'id de l'utilisateur connecté
      });
      console.log("Réponse serveur :", response.data);
      setWishTitle("");
      fetchWishes(); // Rafraîchit la liste des souhaits après ajout
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du souhait :",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Container className="dashboard-container">
      <header className="dashboard-header">
        <h2>Wishes</h2>
      </header>
      <div className="dashboard-content">
        <div className="wish-list">
          <h3>MY CURRENT WISH LIST</h3>
          <ul>
            {wishes.map((wish) => (
              <li key={wish.id}>
                {wish.title} - Fait le{" "}
                {new Date(wish.created_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
          <Button variant="dark">SEE MORE</Button>
        </div>
        <div className="make-wish">
          <h3>MAKE A WISH</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="wishTitle">
              <Form.Control
                type="text"
                placeholder="Title"
                value={wishTitle}
                onChange={(e) => setWishTitle(e.target.value)}
              />
            </Form.Group>
            <Button variant="secondary" type="submit" className="mt-2">
              SUBMIT
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
