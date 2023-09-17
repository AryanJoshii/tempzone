<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../model/template.php";

$database = new Template();
header('Content-type: application/json');

$request = json_decode(file_get_contents('php://input'), true);

if(isset($request["token"]) && isset($request["template_category"])){
    $template_data = $database->createTemplate($request["token"],$request["template_category"]);
    if($template_data){
        $data = [ 'status' => 202, 'data' => json_encode($template_data) ,'msg' => "Template Created Successful.",'error' => 0 ];
        http_response_code(202);
    }else{
        $data = ['status' => 404, 'data' => json_encode(array($request["token"],$request["template_category"])) ,'msg' => "Error Occurce In Create Template. Please try again.",'error' => 0 ];
        http_response_code(404);
    }
    echo json_encode($data);
}
