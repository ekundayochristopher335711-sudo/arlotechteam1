<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

// GET: public, no auth needed
if ($method === 'GET') {
    $posts = readPosts();

    // Single post by slug
    if (isset($_GET['slug'])) {
        $slug = $_GET['slug'];
        foreach ($posts as $post) {
            if ($post['slug'] === $slug) {
                echo json_encode($post);
                exit();
            }
        }
        http_response_code(404);
        echo json_encode(['error' => 'Post not found']);
        exit();
    }

    echo json_encode($posts);
    exit();
}

// All other methods require auth
checkAuth();

$input = json_decode(file_get_contents('php://input'), true);

// POST: create new post
if ($method === 'POST') {
    if (empty($input['title']) || empty($input['content'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Title and content are required']);
        exit();
    }

    $posts = readPosts();

    $slug = !empty($input['slug']) ? $input['slug'] : generateSlug($input['title']);

    // Ensure unique slug
    $baseSlug = $slug;
    $counter = 1;
    while (array_filter($posts, function($p) use ($slug) { return $p['slug'] === $slug; })) {
        $slug = $baseSlug . '-' . $counter;
        $counter++;
    }

    $post = [
        'slug' => $slug,
        'title' => $input['title'],
        'excerpt' => $input['excerpt'] ?? '',
        'category' => $input['category'] ?? 'Web Design',
        'date' => $input['date'] ?? date('F j, Y'),
        'readTime' => $input['readTime'] ?? '5 min read',
        'author' => $input['author'] ?? 'Christopher S.',
        'featured' => $input['featured'] ?? false,
        'image' => $input['image'] ?? '',
        'content' => $input['content'],
    ];

    array_unshift($posts, $post);
    writePosts($posts);

    http_response_code(201);
    echo json_encode($post);
    exit();
}

// PUT: update existing post
if ($method === 'PUT') {
    if (empty($input['slug'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Slug is required']);
        exit();
    }

    $posts = readPosts();
    $found = false;

    foreach ($posts as &$post) {
        if ($post['slug'] === $input['slug']) {
            if (isset($input['title'])) $post['title'] = $input['title'];
            if (isset($input['excerpt'])) $post['excerpt'] = $input['excerpt'];
            if (isset($input['category'])) $post['category'] = $input['category'];
            if (isset($input['date'])) $post['date'] = $input['date'];
            if (isset($input['readTime'])) $post['readTime'] = $input['readTime'];
            if (isset($input['author'])) $post['author'] = $input['author'];
            if (isset($input['featured'])) $post['featured'] = $input['featured'];
            if (isset($input['content'])) $post['content'] = $input['content'];
            if (array_key_exists('image', $input)) $post['image'] = $input['image'];
            $found = true;
            break;
        }
    }

    if (!$found) {
        http_response_code(404);
        echo json_encode(['error' => 'Post not found']);
        exit();
    }

    writePosts($posts);
    echo json_encode(['success' => true]);
    exit();
}

// DELETE: remove post
if ($method === 'DELETE') {
    if (empty($input['slug'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Slug is required']);
        exit();
    }

    $posts = readPosts();
    $posts = array_values(array_filter($posts, function($p) use ($input) {
        return $p['slug'] !== $input['slug'];
    }));

    writePosts($posts);
    echo json_encode(['success' => true]);
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
