// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); // Middleware CORS

const app = express();
const port = 3001;

// Crée une connexion à la base de données
const db = mysql.createConnection({
  host: "mysql-projetwish.alwaysdata.net",
  user: "399526",
  password: "Projet13022025",
  database: "projetwish_projet",
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware CORS pour permettre les requêtes entre différentes origines
app.use(cors());

// Route de connexion
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM user WHERE email = ?";
  db.execute(query, [email], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête", err);
      return res.status(500).send("Erreur serveur");
    }

    if (results.length > 0) {
      const user = results[0];
      if (password === user.mdp) {
        res.status(200).send("Connexion réussie");
      } else {
        res.status(401).send("Email ou mot de passe incorrect");
      }
    } else {
      res.status(401).send("Email ou mot de passe incorrect");
    }
  });
});

// Route pour enregistrer un souhait
app.post("/api/wishes", (req, res) => {
  const { title, id_user } = req.body; // On récupère l'id_user depuis le frontend

  if (!title || !id_user) {
    return res.status(400).send("Le titre et l'ID utilisateur sont requis.");
  }

  const query =
    "INSERT INTO wishes (title, created_at, id_user) VALUES (?, NOW(), ?)";
  db.execute(query, [title, id_user], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion du souhait :", err);
      return res.status(500).send("Erreur serveur");
    }

    res.status(201).send("Souhait enregistré avec succès.");
  });
});

// Route pour récupérer tous les souhaits
app.get("/api/wishes", (req, res) => {
  const query = "SELECT * FROM wishes ORDER BY created_at DESC";
  db.execute(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des souhaits :", err);
      return res.status(500).send("Erreur serveur");
    }

    res.status(200).json(results);
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
