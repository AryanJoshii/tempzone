<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../model/template.php";

$database = new Template();
header('Content-type: application/json');

$request = json_decode(file_get_contents('php://input'), true);

$request["token"]= "";
$request["template_id"] = 25;

if(isset($request["token"]) && isset($request["template_id"])){
        
    $response = $database->fetchTemplate($request["token"],$request["template_id"]);
    if(0 < count($response)){
        $data = [ 'status' => 202, 'data' => json_encode($response) ,'msg' => "Template Fetched Successful.",'error' => 0 ];
        http_response_code(202);
    }else{
        $data = [ 'status' => 404, 'data' => json_encode($request["token"]) ,'msg' => "Error Occurce In Fetch Template. Please try again.",'error' => 0 ];
        http_response_code(404);
    }
    return json_encode($data);
}
