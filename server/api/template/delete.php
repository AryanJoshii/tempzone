<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../model/template.php";

$database = new Template();
header('Content-type: application/json');

$request = json_decode(file_get_contents('php://input'), true);
$headers = getallheaders();

// $request["token"]= "HS899/EcJlpPi0RShQHRiw==";
// $request["template_id"] = 29;
if(array_key_exists("Authorization", $headers) && $request["template_id"]){    
    $deletedTemplate = $database->deleteTemplate($headers["Authorization"],$request["template_id"]);
    if($deletedTemplate){
        $data = [ 'status' => 202, 'data' => $deletedTemplate[0] ,'msg' => "Template Deleted Successful.",'error' => 0 ];
        http_response_code(202);
    }else{
        $data = [ 'status' => 404, 'data' => json_decode("{}") ,'msg' => "Error Occurce In Delete Template. Please try again.",'error' => 0 ];
        http_response_code(404);
    }
    echo json_encode($data);
} else {
    $data = [ 'status' => 401, 'data' => json_decode("{}"),'msg' => "Unauthorized",'error' => "Unauthorized" ];
    http_response_code(401);
    echo json_encode($data);
}
