const mysql = require('mysql2');
const bcrypt = require('bcrypt');

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
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');

  const plainPassword = 'test'; 

  // Hachage du mot de passe avec bcrypt
  bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Erreur lors du hachage du mot de passe', err);
      return;
    }

    // Insertion de l'utilisateur avec le mot de passe haché dans la colonne 'mdp'
    const query = 'INSERT INTO user (email, mdp) VALUES (?, ?)';
    db.execute(query, ['test@test.com', hashedPassword], (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur', err);
        return;
      }

      console.log('Utilisateur ajouté avec succès');
    });
  });
});
