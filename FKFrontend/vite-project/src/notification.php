<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET");

$filename = 'notifications.json';

// GET: Fetch notifications for a specific school ID
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $schoolId = $_GET['schoolId'] ?? '';

    if (file_exists($filename)) {
        $json = file_get_contents($filename);
        $notifications = json_decode($json, true);

        // Filter notifications for the given school ID
        $filtered = array_filter($notifications, function ($notif) use ($schoolId) {
            return $notif['schoolId'] === $schoolId;
        });

        echo json_encode(array_values($filtered));
    } else {
        echo json_encode([]);
    }
    exit;
}

// POST: Add a new notification
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['schoolId'], $data['message'], $data['status'])) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields."]);
        exit;
    }

    $newNotification = [
        "schoolId" => $data['schoolId'],
        "message" => $data['message'],
        "status" => $data['status'],
        "timestamp" => date("Y-m-d H:i:s")
    ];

    $existing = [];
    if (file_exists($filename)) {
        $existing = json_decode(file_get_contents($filename), true);
    }

    $existing[] = $newNotification;
    file_put_contents($filename, json_encode($existing, JSON_PRETTY_PRINT));

    echo json_encode(["success" => true]);
}
?>