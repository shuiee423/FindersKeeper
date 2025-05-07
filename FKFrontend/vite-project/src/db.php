<?php
// db.php — Establish connection to the MySQL database

$host = 'localhost';
$dbname = 'finders_keeper_db'; // You can change this to your actual database name
$username = 'root';
$password = ''; // Leave blank if no password (for local servers like XAMPP)

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>