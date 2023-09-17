<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../../model/template.php";

$database = new Template();
header('Content-type: application/json');

$request = json_decode(file_get_contents('php://input'), true);

if(isset($request["token"]) && isset($request["template_id"])){    
    $response = $database->deleteTemplateByadmin($request["token"],$request["template_id"]);
    if(0 < count($response)){
        $data = [ 'status' => 202, 'data' => array($request["token"],$response) ,'msg' => "Users Template Deleted Successful.",'error' => 0 ];
        http_response_code(202);
    }else{
        $data = [ 'status' => 404, 'data' => json_encode($request["token"]) ,'msg' => "Error Occurce In Delete Template. Please try again.",'error' => 0 ];
        http_response_code(404);
    }
    echo json_encode($data);
}
