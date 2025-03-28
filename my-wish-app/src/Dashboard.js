import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Button, Form } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css'; // Assurez-vous que les icônes sont importées
import "./Dashboard.css";

const Dashboard = () => {
  const [wishTitle, setWishTitle] = useState("");
  const [wishDate, setWishDate] = useState("");
  const [wishes, setWishes] = useState([]);
  const [userId, setUserId] = useState(1); // Remplace par l'id de l'utilisateur connecté
  const [selectedMonth, setSelectedMonth] = useState(""); // Mois sélectionné pour le tri
  const [editWishId, setEditWishId] = useState(null); // ID du vœu à éditer
  const [editWishTitle, setEditWishTitle] = useState(""); // Titre du vœu à éditer
  const [editWishDate, setEditWishDate] = useState(""); // Date du vœu à éditer

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

  // Filtrer les souhaits par mois sélectionné
  const filteredWishes = selectedMonth
    ? wishes.filter(
        (wish) => new Date(wish.target_date).getMonth() + 1 === parseInt(selectedMonth)
      )
    : wishes;

  // Fonction d'édition
  const handleEdit = (wishId) => {
    const wishToEdit = wishes.find((wish) => wish.id === wishId);
    if (wishToEdit) {
      setEditWishId(wishId);
      setEditWishTitle(wishToEdit.title);
      setEditWishDate(wishToEdit.target_date);
    }
  };

  // Soumettre l'édition du vœu
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    if (!editWishTitle || !editWishDate) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/api/wishes/${editWishId}`, {
        title: editWishTitle,
        target_date: editWishDate,
        id_user: userId,
      });

      // Réinitialiser les champs d'édition et mettre à jour la liste des souhaits
      setEditWishId(null);
      setEditWishTitle("");
      setEditWishDate("");
      fetchWishes();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du souhait :", error.response?.data || error.message);
    }
  };

  // Fonction de suppression d'un vœu
  const handleDelete = async (wishId) => {
    try {
      await axios.delete(`http://localhost:3001/api/wishes/${wishId}`);
      fetchWishes(); // Actualiser la liste après la suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du souhait :", error.message);
    }
  };

  return (
    <Container className="dashboard-container">
      {/* Ajout du fond avec les bulles */}
      <div className="bubbles-background">
        {/* Génère des bulles */}
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="bubble"
            style={{
              width: `${Math.random() * 50 + 20}px`,
              height: `${Math.random() * 50 + 20}px`,
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <header className="dashboard-header">
        <h2>Wishes</h2>
      </header>
      <div className="dashboard-content">
        <div className="wish-list">
          <h3>MY CURRENT WISH LIST</h3>
          <Form.Group controlId="filterByMonth" className="mb-3">
            <Form.Select value={selectedMonth} onChange={handleMonthChange}>
              <option value="">Tous les mois</option>
              <option value="1">Janvier</option>
              <option value="2">Février</option>
              <option value="3">Mars</option>
              <option value="4">Avril</option>
              <option value="5">Mai</option>
              <option value="6">Juin</option>
              <option value="7">Juillet</option>
              <option value="8">Août</option>
              <option value="9">Septembre</option>
              <option value="10">Octobre</option>
              <option value="11">Novembre</option>
              <option value="12">Décembre</option>
            </Form.Select>
          </Form.Group>
          <ul>
            {filteredWishes.map((wish) => (
              <li key={wish.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Affichage du titre et des dates */}
                <div>
                  {wish.title} - Rentrer:{" "}
                  {new Date(wish.created_at).toLocaleDateString()} - Réalise:
                  {new Date(wish.target_date).toLocaleDateString()}
                </div>

                {/* Conteneur pour les icônes à droite */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  {/* Icône du crayon pour éditer */}
                  <i 
                    className="bi bi-pencil" 
                    style={{
                      fontSize: '18px', 
                      cursor: 'pointer'
                    }}
                    onClick={() => handleEdit(wish.id)} // Gestionnaire de clic pour modifier le vœu
                  ></i>

                  {/* Icône de la poubelle pour supprimer */}
                  <i 
                    className="bi bi-trash" 
                    style={{
                      fontSize: '18px', 
                      cursor: 'pointer', 
                      color: 'red'
                    }}
                    onClick={() => handleDelete(wish.id)} // Gestionnaire de clic pour supprimer le vœu
                  ></i>
                </div>
              </li>
            ))}
          </ul>
          <Button variant="dark">SEE MORE</Button>
        </div>

        {/* Formulaire pour créer un vœu */}
        <div className="make-wish">
          <h3>MAKE A WISH</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="wishTitle" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Title"
                value={wishTitle}
                onChange={(e) => setWishTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="wishDate" className="mb-3">
              <Form.Label>Date à réaliser</Form.Label>
              <Form.Control
                type="date"
                value={wishDate}
                onChange={(e) => setWishDate(e.target.value)}
              />
            </Form.Group>
            <Button variant="secondary" type="submit">
              SUBMIT
            </Button>
          </Form>
        </div>

        {/* Formulaire pour éditer un vœu */}
        {editWishId && (
          <div className="edit-wish">
            <h3>Edit Wish</h3>
            <Form onSubmit={handleSubmitEdit}>
              <Form.Group controlId="editWishTitle" className="mb-3">
                <Form.Control
                  type="text"
                  value={editWishTitle}
                  onChange={(e) => setEditWishTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="editWishDate" className="mb-3">
                <Form.Label>Date à réaliser</Form.Label>
                <Form.Control
                  type="date"
                  value={editWishDate}
                  onChange={(e) => setEditWishDate(e.target.value)}
                />
              </Form.Group>
              <Button variant="secondary" type="submit">
                Update Wish
              </Button>
            </Form>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
