<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Connect to database
$conn = new mysqli("localhost", "root", "", "finders_keepers");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Ensure uploads directory exists
$uploadDir = "uploads/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Get form data
$description = $_POST['description'];
$tags = isset($_POST['tags']) ? json_decode($_POST['tags'], true) : [];
$location = $_POST['location'];
$keyDetails = $_POST['keyDetails'];
$nickname = $_POST['nickname'];
$schoolId = $_POST['schoolId'];
$timestamp = date("Y-m-d H:i:s");

// Handle image upload
$imagePath = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $imageName = basename($_FILES['image']['name']);
    $imageTmp = $_FILES['image']['tmp_name'];
    $targetPath = $uploadDir . uniqid() . "_" . $imageName;
    if (move_uploaded_file($imageTmp, $targetPath)) {
        $imagePath = $targetPath;
    }
}

// Insert post into database
$stmt = $conn->prepare("INSERT INTO posts (image, description, tags, location, keyDetails, timestamp, nickname, schoolId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$tagsJson = json_encode($tags);

$stmt->bind_param("ssssssss", $imagePath, $description, $tagsJson, $location, $keyDetails, $timestamp, $nickname, $schoolId);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Post submitted successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to submit post"]);
}

$stmt->close();
$conn->close();
?>