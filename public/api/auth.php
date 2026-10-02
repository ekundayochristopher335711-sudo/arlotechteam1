<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// ── Rate limiting: max 5 failed attempts per IP per 15 minutes ──
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$lockFile = sys_get_temp_dir() . '/arlo_auth_' . md5($ip) . '.json';
$window = 15 * 60; // 15 minutes
$maxAttempts = 5;

$data = ['attempts' => 0, 'first' => time()];
if (file_exists($lockFile)) {
    $stored = json_decode(file_get_contents($lockFile), true);
    if ($stored && (time() - $stored['first']) < $window) {
        $data = $stored;
    }
}

if ($data['attempts'] >= $maxAttempts) {
    $waitSeconds = $window - (time() - $data['first']);
    http_response_code(429);
    echo json_encode(['error' => 'Too many failed attempts. Try again in ' . ceil($waitSeconds / 60) . ' minutes.']);
    exit();
}

// ── Check password ──
$input = json_decode(file_get_contents('php://input'), true);
$password = isset($input['password']) ? $input['password'] : '';

if ($password === ADMIN_PASSWORD) {
    // Reset attempts on success
    if (file_exists($lockFile)) unlink($lockFile);
    echo json_encode(['success' => true]);
} else {
    // Record failed attempt
    $data['attempts']++;
    file_put_contents($lockFile, json_encode($data));
    http_response_code(401);
    $remaining = $maxAttempts - $data['attempts'];
    echo json_encode(['error' => $remaining > 0 ? "Wrong password. $remaining attempts left." : 'Too many failed attempts. Try again in 15 minutes.']);
}
