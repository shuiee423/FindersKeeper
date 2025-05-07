<?php
header('Content-Type: application/json');
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Register new user
    $input = json_decode(file_get_contents("php://input"), true);

    if (
        isset($input['schoolId']) &&
        isset($input['nickname']) &&
        isset($input['email'])
    ) {
        $schoolId = $input['schoolId'];
        $nickname = $input['nickname'];
        $email = $input['email'];

        // Check if schoolId already exists
        $stmt = $conn->prepare("SELECT * FROM users WHERE schoolId = ?");
        $stmt->execute([$schoolId]);
        if ($stmt->rowCount() > 0) {
            echo json_encode(["error" => "Account already exists with this School ID."]);
            exit;
        }

        // Insert new user
        $sql = "INSERT INTO users (schoolId, nickname, email) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $success = $stmt->execute([$schoolId, $nickname, $email]);

        if ($success) {
            echo json_encode(["message" => "User registered successfully."]);
        } else {
            echo json_encode(["error" => "Failed to register user."]);
        }
    } else {
        echo json_encode(["error" => "Missing fields in request."]);
    }

} elseif ($method === 'GET') {
    // Login: check if a user exists
    $schoolId = $_GET['schoolId'] ?? '';
    $email = $_GET['email'] ?? '';

    if (!$schoolId || !$email) {
        echo json_encode(["error" => "Missing schoolId or email."]);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE schoolId = ? AND email = ?");
    $stmt->execute([$schoolId, $email]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode(["message" => "Login successful.", "user" => $user]);
    } else {
        echo json_encode(["error" => "No matching account found."]);
    }

} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);
}
?>