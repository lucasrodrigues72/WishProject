const express = require('express');
const app = express();
const port = 3000;

// Pour gérer les données POST du formulaire
app.use(express.urlencoded({ extended: true }));

// Route pour afficher le formulaire de connexion
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Connexion</title>
      <!-- Bootstrap CDN -->
      <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body class="bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <h1 class="text-center my-5">Connexion</h1>
            <form action="/login" method="POST" class="border p-4 rounded shadow-sm bg-white">
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" class="form-control" required placeholder="Entrez votre email">
              </div>
              <div class="form-group">
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" name="password" class="form-control" required placeholder="Entrez votre mot de passe">
              </div>
              <div class="form-check">
                <input type="checkbox" id="rememberMe" name="rememberMe" class="form-check-input">
                <label for="rememberMe" class="form-check-label">Se souvenir de moi</label>
              </div>
              <button type="submit" class="btn btn-primary btn-block mt-3">Se connecter</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Bootstrap JS (si tu veux ajouter des interactions dynamiques comme des modals ou des alertes) -->
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </body>
    </html>
  `);
});

// Route pour traiter la soumission du formulaire de connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Ici, tu peux ajouter une logique pour vérifier les informations (ex: comparer avec une base de données)
  if (email === "utilisateur@example.com" && password === "motdepasse") {
    res.send(`
      <h1 class="text-center">Bienvenue, ${email}!</h1>
      <p class="text-center">Connexion réussie!</p>
    `);
  } else {
    res.send(`
      <h1 class="text-center text-danger">Erreur de connexion</h1>
      <p class="text-center text-danger">Email ou mot de passe incorrect!</p>
    `);
  }
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Le serveur est à l'écoute sur http://localhost:${port}`);
});
