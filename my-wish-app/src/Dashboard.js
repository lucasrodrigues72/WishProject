import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [wishTitle, setWishTitle] = useState("");
  const [wishes, setWishes] = useState([]);

  // Fonction pour récupérer tous les souhaits depuis le backend
  const fetchWishes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/wishes");
      setWishes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des souhaits :", error);
    }
  };

  // Appel de la fonction fetchWishes au chargement de la page
  useEffect(() => {
    fetchWishes();
  }, []);

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!wishTitle.trim()) {
      alert("Veuillez entrer un souhait valide.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/wishes", {
        title: wishTitle,
      });

      if (response.status === 201) {
        alert("Souhait enregistré avec succès !");
        setWishTitle(""); // Réinitialiser l'input
        fetchWishes(); // Recharger la liste des souhaits
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du souhait :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
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
                {wish.title} - Créé le{" "}
                {new Date(wish.created_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
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
