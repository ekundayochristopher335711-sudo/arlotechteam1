<?php
// Copy this file to config.php on the server and set a unique password.
define('ADMIN_PASSWORD', 'REPLACE_WITH_A_LONG_RANDOM_PASSWORD');

define('POSTS_FILE', __DIR__ . '/posts.json');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function checkAuth() {
    $auth = '';
    if (function_exists('getallheaders')) {
        foreach (getallheaders() as $key => $value) {
            if (strtolower($key) === 'authorization') {
                $auth = $value;
                break;
            }
        }
    }
    if (!$auth && isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $auth = $_SERVER['HTTP_AUTHORIZATION'];
    }
    if (!$auth && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $auth = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    }
    if (!$auth && isset($_SERVER['REDIRECT_HTTP_HTTP_AUTHORIZATION'])) {
        $auth = $_SERVER['REDIRECT_HTTP_HTTP_AUTHORIZATION'];
    }
    if ($auth !== 'Bearer ' . ADMIN_PASSWORD) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit();
    }
}

function readPosts() {
    if (!file_exists(POSTS_FILE)) {
        return [];
    }
    $data = file_get_contents(POSTS_FILE);
    return json_decode($data, true) ?: [];
}

function writePosts($posts) {
    file_put_contents(POSTS_FILE, json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function generateSlug($title) {
    $slug = strtolower(trim($title));
    $slug = preg_replace('/[^a-z0-9\s-]/', '', $slug);
    $slug = preg_replace('/[\s-]+/', '-', $slug);
    return trim($slug, '-');
}