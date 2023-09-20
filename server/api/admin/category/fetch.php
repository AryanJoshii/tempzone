<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../../model/user.php";

$database = new User();
header('Content-type: application/json');

$request = json_decode(file_get_contents('php://input'), true);
$headers = getallheaders();

if(array_key_exists("Authorization", $headers)){    
    $response = $database->fetchAllCategories($headers["Authorization"]);
    if(0 < count($response)){
        $data = [ 'status' => 202, 'data' => $response,'msg' => "Categories Found.",'error' => 0 ];
        http_response_code(202);
    }else{
        $data = [ 'status' => 404, 'data' => json_decode("[]") ,'msg' => "No Categories Found",'error' => 0 ];
        http_response_code(404);
    }
    echo json_encode($data);
} else {
    $data = [ 'status' => 401, 'data' => json_decode("{}"),'msg' => "Unauthorized",'error' => "Unauthorized" ];
    http_response_code(401);
    echo json_encode($data);
}
