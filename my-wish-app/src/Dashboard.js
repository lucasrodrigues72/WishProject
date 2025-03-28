import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Button, Form } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

  // Fonction pour récupérer les souhaits depuis l'API
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

  // Charger les souhaits lors du montage du composant
  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  // Soumettre un nouveau souhait
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

  // Filtrer les souhaits par mois sélectionné
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const filteredWishes = selectedMonth
    ? wishes.filter(
        (wish) => new Date(wish.target_date).getMonth() + 1 === parseInt(selectedMonth)
      )
    : wishes;

  // Fonction pour éditer un vœu
  const handleEdit = (wishId) => {
    const wishToEdit = wishes.find((wish) => wish.wishes_id === wishId);
    if (wishToEdit) {
      setEditWishId(wishId);
      setEditWishTitle(wishToEdit.title);
      setEditWishDate(wishToEdit.target_date);
    }
  };

  // Soumettre l'édition d'un vœu
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
      });

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
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce souhait ?");
    if (!confirmDelete) return;

    if (!wishId) {
      console.error("ID du vœu manquant");
      return;
    }

    try {
      console.log(`Deleting wish with ID: ${wishId}`);
      await axios.delete(`http://localhost:3001/api/wishes/${wishId}`);
      fetchWishes();
    } catch (error) {
      console.error("Erreur lors de la suppression du souhait :", error.response?.data || error.message);
    }
  };

  // Données du graphique (comptage des vœux par mois)
  const chartData = [
    { name: 'Janvier', vœux: filteredWishes.filter(wish => new Date(wish.target_date).getMonth() === 0).length },
    { name: 'Février', vœux: filteredWishes.filter(wish => new Date(wish.target_date).getMonth() === 1).length },
    { name: 'Mars', vœux: filteredWishes.filter(wish => new Date(wish.target_date).getMonth() === 2).length },
    { name: 'Avril', vœux: filteredWishes.filter(wish => new Date(wish.target_date).getMonth() === 3).length },
    { name: 'Mai', vœux: filteredWishes.filter(wish => new Date(wish.target_date).getMonth() === 4).length },
    { name: 'Juin', vœux: filteredWishes.filter(wish => new Date(wish.target_date).getMonth() === 5).length },
    { name: 'Juillet', vœux: filteredWishes.filter(wish => new Date(wish.target_date).getMonth() === 6).length },
    { name: 'Août', vœux: filteredWishes.filter(wish => new Date(wish.target_date).getMonth() === 7).length },
    { name: 'Septembre', vœux: filteredWishes.filter(wish => new Date(wish.target_date).getMonth() === 8).length },
    { name: 'Octobre', vœux: filteredWishes.filter(wish => new Date(wish.target_date).getMonth() === 9).length },
    { name: 'Novembre', vœux: filteredWishes.filter(wish => new Date(wish.target_date).getMonth() === 10).length },
    { name: 'Décembre', vœux: filteredWishes.filter(wish => new Date(wish.target_date).getMonth() === 11).length },
  ];

  return (
    <Container className="dashboard-container">
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
              <li key={wish.wishes_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  {wish.title} - Rentrer: {new Date(wish.created_at).toLocaleDateString()} - Réalise:
                  {new Date(wish.target_date).toLocaleDateString()}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <i
                    className="bi bi-pencil"
                    style={{ fontSize: '18px', cursor: 'pointer' }}
                    onClick={() => handleEdit(wish.wishes_id)}
                  ></i>
                  <i
                    className="bi bi-trash"
                    style={{
                      fontSize: '18px',
                      cursor: 'pointer',
                      color: 'red',
                    }}
                    onClick={() => handleDelete(wish.wishes_id)} // Modifié pour utiliser "wish.wishes_id"
                  ></i>
                </div>
              </li>
            ))}
          </ul>
          <Button variant="dark">SEE MORE</Button>
        </div>

        {/* Formulaire pour créer un souhait */}
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
      </div>

      {/* Graphique des souhaits par mois */}
      <div className="wish-chart">
        <h3>Wish Distribution by Month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="vœux" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      
<div className="bubbles-background">
  <div className="bubble bubble1"></div>
  <div className="bubble bubble2"></div>
  <div className="bubble bubble3"></div>
  <div className="bubble bubble4"></div>
  <div className="bubble bubble5"></div>
</div>

    </Container>
  );
};

export default Dashboard;
