<?php
$host = "192.168.1.87"; // Adresse du serveur MySQL
$dbname = "projet"; // Nom de la base de données
$username = "root"; // Nom d'utilisateur MySQL (par défaut : root)
$password = "root"; // Mot de passe MySQL (par défaut vide sur localhost)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connexion réussie à la base de données distante!";
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>