<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';
// Check if required fields are present
if (
    isset($_POST['schoolId']) &&
    isset($_POST['fullName']) &&
    isset($_POST['department']) &&
    isset($_POST['phone']) &&
    isset($_POST['proofDesc']) &&
    isset($_POST['postDescription']) &&
    isset($_POST['postLocation']) &&
    isset($_POST['postTimestamp']) &&
    isset($_POST['postNickname']) &&
    isset($_POST['postSchoolId'])
) {
    $schoolId = $_POST['schoolId'];
    $fullName = $_POST['fullName'];
    $department = $_POST['department'];
    $phone = $_POST['phone'];
    $proofDesc = $_POST['proofDesc'];

    // Post metadata
    $postDescription = $_POST['postDescription'];
    $postLocation = $_POST['postLocation'];
    $postTimestamp = $_POST['postTimestamp'];
    $postNickname = $_POST['postNickname'];
    $postSchoolId = $_POST['postSchoolId'];

    // Handle image upload
    $proofImagePath = '';
    if (isset($_FILES['proofImage']) && $_FILES['proofImage']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileTmp = $_FILES['proofImage']['tmp_name'];
        $fileName = basename($_FILES['proofImage']['name']);
        $targetPath = $uploadDir . time() . '_' . $fileName;

        if (move_uploaded_file($fileTmp, $targetPath)) {
            $proofImagePath = $targetPath;
        }
    }

    $stmt = $conn->prepare("INSERT INTO claims (
        schoolId, fullName, department, phone, proofDesc, proofImage,
        postDescription, postLocation, postTimestamp, postNickname, postSchoolId, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')");

    $stmt->bind_param(
        "sssssssssss",
        $schoolId,
        $fullName,
        $department,
        $phone,
        $proofDesc,
        $proofImagePath,
        $postDescription,
        $postLocation,
        $postTimestamp,
        $postNickname,
        $postSchoolId
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Claim submitted successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error submitting claim."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Incomplete data."]);
}

$conn->close();
?>