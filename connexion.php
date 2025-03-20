<?php
$servername = "localhost"; // ou "127.0.0.1"
$username = "root"; // L'utilisateur créé pour accéder à la base
$password = "root"; // Le mot de passe de cet utilisateur
$dbname = "projet"; // Le nom de ta base de données

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifie la connexion
if ($conn->connect_error) {
    die("Échec de la connexion: " . $conn->connect_error);
}

// Requête SQL pour obtenir des données (à adapter selon tes besoins)
$sql = "SELECT * FROM ta_table"; // Remplace "ta_table" par le nom de ta table
$result = $conn->query($sql);

// Vérifie si la requête a renvoyé un objet
if (!$result) {
    die("Erreur dans la requête SQL: " . $conn->error); // Si la requête échoue, afficher l'erreur
}

// Vérifie si des résultats ont été trouvés
if ($result->num_rows > 0) {
    // Crée la table HTML pour afficher les données
    echo "<table border='1'>";
    echo "<tr><th>ID</th><th>Nom</th><th>Email</th></tr>"; // Ajuste les colonnes selon ta table

    // Affiche les données ligne par ligne
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["id"] . "</td><td>" . $row["nom"] . "</td><td>" . $row["email"] . "</td></tr>"; // Ajuste selon les colonnes de ta table
    }
    echo "</table>";
} else {
    echo "Aucun résultat trouvé"; // Si la requête ne retourne aucun résultat
}

// Ferme la connexion
$conn->close();
?>