<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../../model/template.php";

$database = new Template();
header('Content-type: application/json');

$request = json_decode(file_get_contents('php://input'), true);
$headers = getallheaders();

if(array_key_exists("Authorization", $headers)){    
    $response = $database->getTemplates($headers["Authorization"]);
    if(0 < count($response)){
        $data = [ 'status' => 202, 'data' => $response,'msg' => "User Template Clone Successful.",'error' => 0 ];
        http_response_code(202);
    }else{
        $data = [ 'status' => 404, 'data' => json_decode("[]") ,'msg' => "No templates Found",'error' => 0 ];
        http_response_code(404);
    }
    echo json_encode($data);
}
