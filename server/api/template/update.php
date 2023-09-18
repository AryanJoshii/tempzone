<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../model/template.php";

$database = new Template();
header('Content-type: application/json');

$request = json_decode(file_get_contents('php://input'), true);
$headers = getallheaders();

// $request["token"]= "abcds";
// $request["template_id"] = "24";
// $request["template_data"] = array("template_name" => "Updated Name","template_tags" => '<html><head><title>sd</title><body><p id="test">Hello</p></body></html>' ,"template_category" => 1,"template_owner" =>24,"template_id" => 19);

if(array_key_exists("Authorization", $headers) && $request["template_data"]){    
    $response = $database->updateTemplate($headers["Authorization"],$request["template_data"]);
    if($response){
        $data = [ 'status' => 202, 'data' => $response[0] ,'msg' => "Template Updated Successful.",'error' => 0 ];
        http_response_code(202);
    }else{
        $data = [ 'status' => 404, 'data' => json_decode("{}") ,'msg' => "Error Occurce In Update Template. Please try again.",'error' => 0 ];
        http_response_code(404);
    }
    echo json_encode($data);
} else {
    $data = [ 'status' => 401, 'data' => json_decode("{}"),'msg' => "Unauthorized",'error' => "Unauthorized" ];
    http_response_code(401);
    echo json_encode($data);
}
