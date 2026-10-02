<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Auth: accept token as form field (most reliable on cPanel shared hosting)
// or fall back to Authorization header
$token = isset($_POST['_token']) ? $_POST['_token'] : '';
if (!$token) {
    // Fallback to Authorization header
    $auth = '';
    if (function_exists('getallheaders')) {
        foreach (getallheaders() as $key => $value) {
            if (strtolower($key) === 'authorization') { $auth = $value; break; }
        }
    }
    if (!$auth && isset($_SERVER['HTTP_AUTHORIZATION']))          $auth = $_SERVER['HTTP_AUTHORIZATION'];
    if (!$auth && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) $auth = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    $token = str_replace('Bearer ', '', $auth);
}

if ($token !== ADMIN_PASSWORD) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    $errCode = isset($_FILES['image']) ? $_FILES['image']['error'] : 'no file';
    http_response_code(400);
    echo json_encode(['error' => 'No image received (error code: ' . $errCode . ')']);
    exit();
}

$file = $_FILES['image'];

// Check extension (finfo may not be available on all shared hosts)
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$allowedExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
if (!in_array($ext, $allowedExt)) {
    http_response_code(400);
    echo json_encode(['error' => 'Only JPG, PNG, WebP, and GIF are allowed']);
    exit();
}

if ($file['size'] > 5 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(['error' => 'Image must be under 5MB']);
    exit();
}

$uploadDir = dirname(__DIR__) . '/uploads/';

if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['error' => 'Could not create uploads folder. Create /uploads/ manually in cPanel with 755 permissions.']);
        exit();
    }
}

if (!is_writable($uploadDir)) {
    http_response_code(500);
    echo json_encode(['error' => 'Uploads folder is not writable. Set /uploads/ to 755 in cPanel File Manager.']);
    exit();
}

$filename = time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
$path = $uploadDir . $filename;

if (!move_uploaded_file($file['tmp_name'], $path)) {
    http_response_code(500);
    echo json_encode(['error' => 'Upload failed: could not save file.']);
    exit();
}

echo json_encode(['url' => '/uploads/' . $filename]);
