<?php
require_once __DIR__ . '/config.php';

function readReviews() {
    $reviews = include __DIR__ . '/reviews-store.php';
    return is_array($reviews) ? $reviews : [];
}

function writeReviews($reviews) {
    $file = __DIR__ . '/reviews-store.php';
    $temporary = $file . '.tmp';
    $contents = "<?php\nreturn " . var_export(array_values($reviews), true) . ";\n";
    if (file_put_contents($temporary, $contents, LOCK_EX) === false) {
        return false;
    }
    return rename($temporary, $file);
}

function requestHasAuthorization() {
    $authorization = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (!$authorization && function_exists('getallheaders')) {
        foreach (getallheaders() as $key => $value) {
            if (strtolower($key) === 'authorization') {
                $authorization = $value;
                break;
            }
        }
    }
    return $authorization !== '';
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $admin = requestHasAuthorization();
    if ($admin) {
        checkAuth();
    }
    $reviews = readReviews();
    if (!$admin) {
        $reviews = array_values(array_filter($reviews, function ($review) {
            return ($review['status'] ?? '') === 'approved';
        }));
    }
    echo json_encode($reviews, JSON_UNESCAPED_UNICODE);
    exit();
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid review data']);
        exit();
    }

    // Silently accept honeypot submissions without adding them to the queue.
    if (!empty($input['website'])) {
        http_response_code(201);
        echo json_encode(['success' => true]);
        exit();
    }

    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $lockFile = sys_get_temp_dir() . '/arlo_reviews_' . md5($ip) . '.json';
    $window = 15 * 60;
    $limit = 5;
    $attempts = ['count' => 0, 'first' => time()];
    if (file_exists($lockFile)) {
        $stored = json_decode(file_get_contents($lockFile), true);
        if ($stored && (time() - $stored['first']) < $window) {
            $attempts = $stored;
        }
    }
    if ($attempts['count'] >= $limit) {
        http_response_code(429);
        echo json_encode(['error' => 'Too many submissions. Please try again later.']);
        exit();
    }

    $name = trim($input['name'] ?? '');
    $business = trim($input['business'] ?? '');
    $quote = trim($input['quote'] ?? '');
    $rating = filter_var($input['rating'] ?? null, FILTER_VALIDATE_INT);
    $quoteLength = function_exists('mb_strlen') ? mb_strlen($quote) : strlen($quote);

    if ($name === '' || strlen($name) > 100 || strlen($business) > 120 ||
        $rating === false || $rating < 1 || $rating > 5 || $quoteLength < 10 || $quoteLength > 1200) {
        http_response_code(400);
        echo json_encode(['error' => 'Enter your name, a rating from 1 to 5, and a review between 10 and 1,200 characters.']);
        exit();
    }

    $attempts['count']++;
    file_put_contents($lockFile, json_encode($attempts), LOCK_EX);

    $reviews = readReviews();
    $review = [
        'id' => bin2hex(random_bytes(12)),
        'name' => $name,
        'business' => $business,
        'rating' => $rating,
        'quote' => $quote,
        'image' => '',
        'status' => 'pending',
        'createdAt' => gmdate(DATE_ATOM),
    ];
    $reviews[] = $review;

    if (!writeReviews($reviews)) {
        http_response_code(500);
        echo json_encode(['error' => 'Could not save your review. Please try again later.']);
        exit();
    }

    http_response_code(201);
    echo json_encode(['success' => true]);
    exit();
}

if ($method === 'PUT') {
    checkAuth();
    $input = json_decode(file_get_contents('php://input'), true);
    $id = is_array($input) ? ($input['id'] ?? '') : '';
    $status = is_array($input) ? ($input['status'] ?? '') : '';
    if ($id === '' || !in_array($status, ['approved', 'rejected'], true)) {
        http_response_code(400);
        echo json_encode(['error' => 'A review ID and valid moderation status are required']);
        exit();
    }

    $reviews = readReviews();
    $found = false;
    foreach ($reviews as &$review) {
        if ($review['id'] === $id) {
            $review['status'] = $status;
            $found = true;
            break;
        }
    }
    unset($review);

    if (!$found) {
        http_response_code(404);
        echo json_encode(['error' => 'Review not found']);
        exit();
    }
    if (!writeReviews($reviews)) {
        http_response_code(500);
        echo json_encode(['error' => 'Could not update review']);
        exit();
    }

    echo json_encode(['success' => true]);
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
