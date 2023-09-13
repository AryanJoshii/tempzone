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
$request["fetch_all"] = false;

if(isset($request["token"]) && ($request["template_id"] || $request["fetch_all"])){    
    $response = $database->fetchTemplate($request["token"],$request["template_id"],$request["fetch_all"]);
    if(0 < count($response)){
        $data = [ 'status' => 202, 'data' => json_encode($response) ,'msg' => "Template Fetched Successful.",'error' => 0 ];
        http_response_code(202);
    }else{
        $data = [ 'status' => 404, 'data' => json_encode($request["token"]) ,'msg' => "Error Occurce In Fetch Template. Please try again.",'error' => 0 ];
        http_response_code(404);
    }
    echo json_encode($data);
}
