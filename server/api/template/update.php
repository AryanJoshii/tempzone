<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../model/template.php";

$database = new Template();
header('Content-type: application/json');

$request = json_decode(file_get_contents('php://input'), true);

// $request["token"]= "abcds";
// $request["template_id"] = "17";
// $request["template_data"] = array("template_name" => "Updated Name","template_tags" => '<html><head><title>sd</title><body><p id="test">Hello</p></body></html>' ,"template_category" => 1,"template_owner" => 19,"template_id" => 17);

if(isset($request["token"]) && $request["template_id"]){    
    $response = $database->updateTemplate($request["token"],$request["template_data"]);
    if($response){
        $data = [ 'status' => 202, 'data' => json_encode($response) ,'msg' => "Template Updated Successful.",'error' => 0 ];
        http_response_code(202);
    }else{
        $data = [ 'status' => 404, 'data' => json_encode($request["token"]) ,'msg' => "Error Occurce In Update Template. Please try again.",'error' => 0 ];
        http_response_code(404);
    }
    echo json_encode($data);
}
