<?php
// 婚礼祝福语存储 API
// 使用 JSON 文件存储数据，无需数据库

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 处理 CORS 预检请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 数据文件路径
$dataFile = __DIR__ . '/blessings_data.json';

// 读取数据
function readBlessings($file) {
    if (!file_exists($file)) {
        return [];
    }
    $content = file_get_contents($file);
    $data = json_decode($content, true);
    return is_array($data) ? $data : [];
}

// 保存数据
function saveBlessings($file, $data) {
    file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // 获取所有祝福语
    $blessings = readBlessings($dataFile);
    echo json_encode(['success' => true, 'data' => $blessings], JSON_UNESCAPED_UNICODE);

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 添加新祝福语
    $input = json_decode(file_get_contents('php://input'), true);
    
    $text = isset($input['text']) ? trim($input['text']) : '';
    $name = isset($input['name']) ? trim($input['name']) : '匿名来宾';
    
    if (empty($text)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => '祝福语不能为空'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    if (mb_strlen($text) > 100) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => '祝福语不能超过100个字'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    $blessing = [
        'id' => uniqid() . bin2hex(random_bytes(3)),
        'text' => mb_substr($text, 0, 100),
        'name' => mb_substr($name, 0, 20),
        'time' => date('c')
    ];
    
    $blessings = readBlessings($dataFile);
    $blessings[] = $blessing;
    
    // 最多保留200条
    if (count($blessings) > 200) {
        $blessings = array_slice($blessings, -200);
    }
    
    saveBlessings($dataFile, $blessings);
    echo json_encode(['success' => true, 'data' => $blessing], JSON_UNESCAPED_UNICODE);

} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => '不支持的请求方法'], JSON_UNESCAPED_UNICODE);
}
