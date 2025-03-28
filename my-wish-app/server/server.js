const express = require("express");
const mysql = require('mysql2');
const cors = require("cors");

const app = express();
const port = 3001;

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: "mysql-projetwish.alwaysdata.net",
  user: "399526",
  password: "Projet13022025",
  database: "projetwish_projet",
});

// Vérifier la connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

// Middleware
app.use(express.json());
app.use(cors());

// Route d'inscription (Création de compte)
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email et mot de passe requis.");
  }

  // Vérifier si l'email existe déjà
  const checkQuery = "SELECT * FROM user WHERE email = ?";
  db.execute(checkQuery, [email], (err, results) => {
    if (err) {
      console.error("Erreur lors de la vérification de l'utilisateur :", err);
      return res.status(500).send("Erreur serveur");
    }

    if (results.length > 0) {
      return res.status(400).send("Cet email est déjà utilisé.");
    }

    // Insérer l'utilisateur
    const insertQuery = "INSERT INTO user (email, mdp) VALUES (?, ?)";
    db.execute(insertQuery, [email, password], (err, result) => {
      if (err) {
        console.error("Erreur lors de l'inscription :", err);
        return res.status(500).send("Erreur serveur");
      }
      res.status(201).send("Compte créé avec succès !");
    });
  });
});

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

      // Vérifier si le mot de passe est correct
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
  const { title, target_date, id_user } = req.body;

  if (!title || !id_user || !target_date) {
    return res.status(400).send("Le titre, l'ID utilisateur et la date sont requis.");
  }

  const query = "INSERT INTO wishes (title, target_date, created_at, id_user) VALUES (?, ?, NOW(), ?)";
  db.execute(query, [title, target_date, id_user], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion du souhait :", err);
      return res.status(500).send("Erreur serveur");
    }

    res.status(201).send("Souhait enregistré avec succès.");
  });
});

// Route pour récupérer tous les souhaits de l'utilisateur
app.get("/api/wishes", (req, res) => {
  const { id_user } = req.query; // Récupérer l'ID utilisateur depuis la query string
  const query = id_user
    ? "SELECT * FROM wishes WHERE id_user = ? ORDER BY created_at DESC"
    : "SELECT * FROM wishes ORDER BY created_at DESC";
  
  db.execute(query, [id_user], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des souhaits :", err);
      return res.status(500).send("Erreur serveur");
    }

    res.status(200).json(results);
  });
});

// Route de suppression d'un vœu (modifiée)
app.delete('/api/wishes/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM wishes WHERE wishes_id = ?';

  db.execute(query, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression du vœu', err);
      return res.status(500).json({ message: 'Erreur lors de la suppression du vœu', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vœu non trouvé' });
    }

    res.status(200).json({ message: 'Vœu supprimé avec succès' });
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
