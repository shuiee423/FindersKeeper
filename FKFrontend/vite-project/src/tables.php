<?php
require_once 'db.php';

// USERS TABLE
$userTable = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(100) NOT NULL,
    schoolId VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL
)";

// POSTS TABLE
$postTable = "CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image TEXT,
    description TEXT,
    tags TEXT,
    location VARCHAR(255),
    keyDetails TEXT,
    nickname VARCHAR(100),
    schoolId VARCHAR(50),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('unclaimed', 'claimed') DEFAULT 'unclaimed'
)";

// CLAIMS TABLE
$claimTable = "CREATE TABLE IF NOT EXISTS claims (
    id INT AUTO_INCREMENT PRIMARY KEY,
    schoolId VARCHAR(50),
    fullName VARCHAR(100),
    department VARCHAR(100),
    phone VARCHAR(20),
    proofDesc TEXT,
    proofImage TEXT,
    postId INT,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)";

// Execute all table queries
if (
    $conn->query($userTable) === TRUE &&
    $conn->query($postTable) === TRUE &&
    $conn->query($claimTable) === TRUE
) {
    echo "All tables created successfully (or already exist).";
} else {
    echo "Error creating tables: " . $conn->error;
}

$conn->close();
?>