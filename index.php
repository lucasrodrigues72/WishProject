<?php
include 'config.php';

$sql = "SELECT * FROM user";
$stmt = $pdo->query($sql);
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($users as $user) {
    echo "Id_User : " . htmlspecialchars($user['id_user']) . " - Email : " . htmlspecialchars($user['email']) . "<br>";
}
?>
