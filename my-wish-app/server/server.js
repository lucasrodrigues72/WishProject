// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Ajout du middleware CORS

const app = express();
const port = 3001;

// Crée une connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'projet'
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la basex de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware CORS pour permettre les requêtes entre différentes origines
app.use(cors());

// Route de connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Recherche l'utilisateur par email
  const query = 'SELECT * FROM user WHERE email = ?';  // Assurez-vous que vous utilisez la bonne table 'user' et le bon champ 'mdp'
  db.execute(query, [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête', err);
      return res.status(500).send('Erreur serveur');
    }

    if (results.length > 0) {
      const user = results[0];

      // Comparaison du mot de passe avec le hash stocké
      bcrypt.compare(password, user.mdp, (err, isMatch) => {
        if (err) {
          console.error('Erreur lors de la comparaison des mots de passe', err);
          return res.status(500).send('Erreur serveur');
        }

        if (isMatch) {
          res.status(200).send('Connexion réussie');
        } else {
          res.status(401).send('Email ou mot de passe incorrect');
        }
      });
    } else {
      res.status(401).send('Email ou mot de passe incorrect');
    }
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
