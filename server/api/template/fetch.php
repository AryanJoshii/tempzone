<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../model/template.php";

$database = new Template();
header('Content-type: application/json');

$request = json_decode(file_get_contents('php://input'), true);
$headers = getallheaders();

// $request["token"]= "";
// $request["template_id"] = 25;

if(array_key_exists("Authorization", $headers) && isset($request["template_id"])){
    $response = $database->fetchTemplate($headers["Authorization"],$request["template_id"]);
    // $resData = array(
    //     "template_id" => $response[0]["template_id"], 
    //     "template_name" => $response[0]["template_name"], 
    //     "template_tags" => json_decode($response[0]["template_tags"], true), 
    //     "template_category" => $response[0]["template_category"], 
    //     "template_owner" => $response[0]["template_owner"], 
    //     "created_at" => $response[0]["created_at"], 
    //     "updated_at" => $response[0]["updated_at"] 
    // );
    // print_r(json_decode($response[0]["template_tags"], true)->fetch_assoc());
    if(0 < count($response)){
        $data = [ 'status' => 202, 'data' => $response[0],'msg' => "Template Fetched Successful.", 'error' => 0 ];
        http_response_code(202);
    }else{
        $data = [ 'status' => 404, 'data' => json_decode("{}"), 'msg' => "Error Occurce In Fetch Template. Please try again.",'error' => 0 ];
        http_response_code(404);
    }
    echo json_encode($data);
} else {
    $data = [ 'status' => 401, 'data' => json_decode("{}"),'msg' => "Unauthorized",'error' => "Unauthorized" ];
    http_response_code(401);
    echo json_encode($data);
}
?>